import type { BaseModel } from './base';
import type { Collection } from './collection';
import type { ServersInterface } from './servers';
import type { ChannelsInterface } from './channels';
import type { OperationsInterface } from './operations';
import type { OperationTraitsInterface } from './operation-traits';
import type { MessagesInterface } from './messages';
import type { MessageTraitsInterface } from './message-traits';
import type { SchemasInterface } from './schemas';
import type { ChannelParametersInterface } from './channel-parameters';
import type { ServerVariablesInterface } from './server-variables';
import type { CorrelationIdInterface } from './correlation-id';
import type { BindingsInterface } from './bindings';
import type { SecuritySchemesInterface } from './security-schemes';
import type { ExtensionsMixinInterface } from './mixins';

export interface Components extends BaseModel, ExtensionsMixinInterface {
  servers(): ServersInterface;
  channels(): ChannelsInterface;
  operations(): OperationsInterface;
  messages(): MessagesInterface;
  schemas(): SchemasInterface;
  channelParameters(): ChannelParametersInterface;
  serverVariables(): ServerVariablesInterface;
  operationTraits(): OperationTraitsInterface;
  messageTraits(): MessageTraitsInterface;
  correlationIds(): Collection<CorrelationIdInterface>;
  securitySchemes(): SecuritySchemesInterface;
  serverBindings(): Collection<BindingsInterface>;
  channelBindings(): Collection<BindingsInterface>;
  operationBindings(): Collection<BindingsInterface>;
  messageBindings(): Collection<BindingsInterface>;
}
