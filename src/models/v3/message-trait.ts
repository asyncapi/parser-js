import { CorrelationId } from './correlation-id';
import { MessageExamples } from '../message-examples';
import { MessageExample } from './message-example';
import { Schema } from './schema';

import { xParserMessageName } from '../../constants';
import { getDefaultSchemaFormat } from '../../schema-parser';
import { CoreModel } from './mixins';

import type { CorrelationIdInterface } from '../correlation-id';
import type { MessageExamplesInterface } from '../message-examples';
import type { MessageTraitInterface } from '../message-trait';
import type { SchemaInterface } from '../schema';

import type { v3 } from '../../spec-types';

export class MessageTrait<J extends v3.MessageTraitObject = v3.MessageTraitObject> extends CoreModel<J, { id: string }> implements MessageTraitInterface {
  id(): string {
    return this.messageId() || this._meta.id || this.extensions().get(xParserMessageName)?.value<string>() as string;
  }

  hasMessageId(): boolean {
    return !!this._json.messageId;
  }

  hasSchemaFormat(): boolean {
    return false;
  }

  schemaFormat(): string | undefined {
    return undefined;
  }

  messageId(): string | undefined {
    return this._json.messageId;
  }
  
  hasCorrelationId(): boolean {
    return !!this._json.correlationId;
  }

  correlationId(): CorrelationIdInterface | undefined {
    if (!this._json.correlationId) return undefined;
    return this.createModel(CorrelationId, this._json.correlationId as v3.CorrelationIDObject, { pointer: this.jsonPath('correlationId') });
  }

  hasContentType(): boolean {
    return !!this._json.contentType;
  }

  contentType(): string | undefined {
    return this._json.contentType || this._meta.asyncapi?.parsed?.defaultContentType;
  }

  hasHeaders(): boolean {
    return !!this._json.headers;
  }

  headers(): SchemaInterface | undefined {
    if (!this._json.headers) return undefined;
    return this.createModel(Schema, this._json.headers, { pointer: this.jsonPath('headers') });
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
        return this.createModel(MessageExample, example, { pointer: this.jsonPath(`examples/${index}`) });
      })
    );
  }
}
