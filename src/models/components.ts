import type { BaseModel } from './base';
import type { BindingsInterface } from './bindings';
import type { ExtensionsMixinInterface } from './mixins';
import type { ServersInterface } from './servers';
import type { ChannelsInterface } from './channels';
import type { OperationsInterface } from './operations';
import type { MessagesInterface } from './messages';
import type { SchemasInterface } from './schemas';
import type { ChannelParametersInterface } from './channel-parameters';
import type { ServerVariablesInterface } from './server-variables';
import type { OperationTraitsInterface } from './operation-traits';
import type { OperationRepliesInterface } from './operation-replies';
import type { MessageTraitsInterface } from './message-traits';
import type { SecuritySchemesInterface } from './security-schemes';
import type { CorrelationIdsInterface } from './correlation-ids';
import type { ExternalDocumentationsInterface } from './external-documentations';
import type { TagsInterface } from './tags';

export interface ComponentsInterface extends BaseModel, ExtensionsMixinInterface {
  servers(): ServersInterface;
  channels(): ChannelsInterface;
  operations(): OperationsInterface;
  messages(): MessagesInterface;
  schemas(): SchemasInterface;
  channelParameters(): ChannelParametersInterface;
  serverVariables(): ServerVariablesInterface;
  operationTraits(): OperationTraitsInterface;
  messageTraits(): MessageTraitsInterface;
  replies(): OperationRepliesInterface;
  correlationIds(): CorrelationIdsInterface;
  securitySchemes(): SecuritySchemesInterface;
  tags(): TagsInterface;
  externalDocs(): ExternalDocumentationsInterface;
  serverBindings(): Record<string, BindingsInterface>;
  channelBindings(): Record<string, BindingsInterface>;
  operationBindings(): Record<string, BindingsInterface>;
  messageBindings(): Record<string, BindingsInterface>;
  isEmpty(): boolean;
}
