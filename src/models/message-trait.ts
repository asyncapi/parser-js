import type { BaseModel } from './base';
import type { CorrelationIdInterface } from './correlation-id';
import type { MessageExamplesInterface } from './message-examples';
import type { CoreMixinInterface } from './mixins';
import type { SchemaInterface } from './schema';

export interface MessageTraitInterface extends BaseModel, CoreMixinInterface {
  id(): string;
  schemaFormat(): string;
  hasMessageId(): boolean;
  messageId(): string | undefined;
  hasCorrelationId(): boolean;
  correlationId(): CorrelationIdInterface | undefined;
  hasContentType(): boolean;
  contentType(): string | undefined;
  hasHeaders(): boolean
  headers(): SchemaInterface | undefined;
  hasName(): boolean;
  name(): string | undefined;
  examples(): MessageExamplesInterface;
}
