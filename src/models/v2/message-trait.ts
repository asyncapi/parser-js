import { CorrelationId } from './correlation-id';
import { MessageExamples } from '../message-examples';
import { MessageExample } from './message-example';
import { Schema } from './schema';

import { xParserMessageName } from '../../constants';
import { CoreModel } from './mixins';

import type { CorrelationIdInterface } from '../correlation-id';
import type { MessageExamplesInterface } from '../message-examples';
import type { MessageTraitInterface } from '../message-trait';
import type { SchemaInterface } from '../schema';

import type { v2 } from '../../spec-types';
import { getDefaultSchemaFormat } from 'schema-parser';

export class MessageTrait<J extends v2.MessageTraitObject = v2.MessageTraitObject> extends CoreModel<J, { id: string }> implements MessageTraitInterface {
  id(): string {
    return this.messageId() || this._meta.id || this.extensions().get(xParserMessageName)?.value<string>() as string;
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

  examples(): MessageExamplesInterface {
    return new MessageExamples(
      (this._json.examples || []).map((example: any, index: number) => {
        return this.createModel(MessageExample, example, { pointer: `${this._meta.pointer}/examples/${index}` });
      })
    );
  }
}
