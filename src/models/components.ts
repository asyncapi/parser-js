import type { BaseModel } from './base';
import type { BindingsInterface } from './bindings';
import type { ExtensionsMixinInterface } from './mixins';
import type { ServersInterface } from './servers';
import type { ChannelsInterface } from './channels';
import type { MessagesInterface } from './messages';
import type { SchemasInterface } from './schemas';
import type { ChannelParametersInterface } from './channel-parameters';
import type { ServerVariablesInterface } from './server-variables';
import type { OperationTraitsInterface } from './operation-traits';
import type { MessageTraitsInterface } from './message-traits';
import type { SecuritySchemesInterface } from './security-schemes';
import type { CorrelationIdsInterface } from './correlation-ids';
import type { OperationsInterface } from './operations';

export interface ComponentsInterface extends BaseModel, ExtensionsMixinInterface {
  servers(): ServersInterface;
  channels(): ChannelsInterface;
  messages(): MessagesInterface;
  schemas(): SchemasInterface;
  channelParameters(): ChannelParametersInterface;
  serverVariables(): ServerVariablesInterface;
  operations(): OperationsInterface;
  operationTraits(): OperationTraitsInterface;
  messageTraits(): MessageTraitsInterface;
  correlationIds(): CorrelationIdsInterface;
  securitySchemes(): SecuritySchemesInterface;
  serverBindings(): Record<string, BindingsInterface>;
  channelBindings(): Record<string, BindingsInterface>;
  operationBindings(): Record<string, BindingsInterface>;
  messageBindings(): Record<string, BindingsInterface>;
  isEmpty(): boolean;
}
