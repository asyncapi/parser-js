import type { BaseModel } from './base';
import type { Collection } from './collection';
import type { ServersInterface } from './servers';
import type { ChannelsInterface } from './channels';
import type { OperationsInterface } from './operations';
import type { OperationsTraitsInterface } from './operation-traits';
import type { MessagesInterface } from './messages';
import type { MessagesTraitsInterface } from './message-traits';
import type { SchemasInterface } from './schemas';
import type { ChannelParametersInterface } from './channel-parameters';
import type { ServerVariablesInterface } from './server-variables';
import type { CorrelationIdInterface } from './correlation-id';
import type { BindingsInterface } from './bindings';
import type { ExtensionsMixinInterface } from './mixins';

export interface Components extends BaseModel, ExtensionsMixinInterface {
  servers(): ServersInterface;
  channels(): ChannelsInterface;
  operations(): OperationsInterface;
  messages(): MessagesInterface;
  schemas(): SchemasInterface;
  channelParameters(): ChannelParametersInterface;
  serverVariables(): ServerVariablesInterface;
  operationTraits(): OperationsTraitsInterface;
  messageTraits(): MessagesTraitsInterface;
  correlationIds(): Collection<CorrelationIdInterface>;
  securitySchemes(): any; // TODO: Fix type after merging Souvik PR
  serverBindings(): Collection<BindingsInterface>;
  channelBindings(): Collection<BindingsInterface>;
  operationBindings(): Collection<BindingsInterface>;
  messageBindings(): Collection<BindingsInterface>;
}
