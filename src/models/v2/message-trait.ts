import { BaseModel } from "../base";
import { CorrelationId } from './correlation-id';
import { MessageExamples } from './message-examples';
import { MessageExample } from './message-example';
import { Schema } from './schema';

import { getDefaultSchemaFormat } from '../../schema-parser/index';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';
import { ExternalDocumentationMixin } from './mixins/external-docs';
import { TagsMixin } from './mixins/tags';

import type { ModelMetadata } from "../base";
import type { CorrelationIdInterface } from "../correlation-id";
import type { MessageExamplesInterface } from "../message-examples";
import type { MessageTraitInterface } from "../message-trait";
import type { SchemaInterface } from "../schema";

export class MessageTrait extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, ExtensionsMixin, ExternalDocumentationMixin, TagsMixin) implements MessageTraitInterface {
  constructor(
    _json: Record<string,any>,
    protected readonly _meta: ModelMetadata & { id: string } = {} as any
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this.messageId() || this._meta.id;
  }

  schemaFormat(): string {
    return this._json.schemaFormat || getDefaultSchemaFormat(this._meta.asyncapi.semver.version);
  }

  hasMessageId(): boolean {
    return !!this._json.messageId;
  }

  messageId(): string | undefined {
    return this._json.messageId;
  }
  
  hasCorrelationId(): boolean {
    return !!this._json.correlationId;
  }

  correlationId(): CorrelationIdInterface | undefined {
    if (!this._json.correlationId) return undefined;
    return this.createModel(CorrelationId, this._json.correlationId, { pointer: `${this._meta.pointer}/correlationId` });
  }

  hasContentType(): boolean {
    return !!this._json.contentType;
  }

  contentType(): string | undefined {
    return this._json.contentType || this._meta.asyncapi?.parsed.defaultContentType;
  }

  hasHeaders(): boolean {
    return !!this._json.headers;
  }

  headers(): SchemaInterface | undefined {
    if (!this._json.headers) return undefined;
    return this.createModel(Schema, this._json.headers, { pointer: `${this._meta.pointer}/headers` });
  }

  hasName(): boolean {
    return !!this._json.name;
  }

  name(): string | undefined {
    return this._json.name;
  }

  hasTitle(): boolean {
    return !!this._json.title;
  }

  title(): string | undefined {
    return this._json.title;
  }

  hasSummary(): boolean {
    return !!this._json.summary;
  }

  summary(): string | undefined {
    return this._json.summary;
  }

  examples(): MessageExamplesInterface {
    return new MessageExamples(
      (this._json.examples || []).map((example: any, index: number) => {
        return this.createModel(MessageExample, example, { pointer: `${this._meta.pointer}/examples/${index}` })
      })
    );
  }
}
