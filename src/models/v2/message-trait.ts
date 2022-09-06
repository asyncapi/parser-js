import { BaseModel } from '../base';
import { CorrelationId } from './correlation-id';
import { MessageExamples } from './message-examples';
import { MessageExample } from './message-example';
import { Schema } from './schema';

import { getDefaultSchemaFormat } from '../../schema-parser';
import { bindings, hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';

import type { BindingsInterface } from '../bindings';
import type { CorrelationIdInterface } from '../correlation-id';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { MessageExamplesInterface } from '../message-examples';
import type { MessageTraitInterface } from '../message-trait';
import type { SchemaInterface } from '../schema';
import type { TagsInterface } from '../tags';

import type { v2 } from '../../spec-types';

export class MessageTrait<J extends v2.MessageTraitObject = v2.MessageTraitObject> extends BaseModel<J, { id: string }> implements MessageTraitInterface {
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
    return this.createModel(CorrelationId, this._json.correlationId as v2.CorrelationIDObject, { pointer: `${this._meta.pointer}/correlationId` });
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

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this);
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this);
  }

  examples(): MessageExamplesInterface {
    return new MessageExamples(
      (this._json.examples || []).map((example: any, index: number) => {
        return this.createModel(MessageExample, example, { pointer: `${this._meta.pointer}/examples/${index}` });
      })
    );
  }

  tags(): TagsInterface {
    return tags(this);
  }

  bindings(): BindingsInterface {
    return bindings(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
