import type { BaseModel } from './base';
import type { ServerInterface } from './server';
import type { ChannelInterface } from './channel';
import type { OperationTraitInterface } from './operation-trait';
import type { MessageInterface } from './message';
import type { MessageTraitInterface } from './message-trait';
import type { SchemaInterface } from './schema';
import type { ChannelParameterInterface } from './channel-parameter';
import type { ServerVariableInterface } from './server-variable';
import type { CorrelationIdInterface } from './correlation-id';
import type { BindingsInterface } from './bindings';
import type { SecuritySchemeInterface } from './security-scheme';
import type { ExtensionsMixinInterface } from './mixins';

export interface ComponentsInterface extends BaseModel, ExtensionsMixinInterface {
  servers(): Record<string, ServerInterface>;
  channels(): Record<string, ChannelInterface>;
  messages(): Record<string, MessageInterface>;
  schemas(): Record<string, SchemaInterface>;
  channelParameters(): Record<string, ChannelParameterInterface>;
  serverVariables(): Record<string, ServerVariableInterface>;
  operationTraits(): Record<string, OperationTraitInterface>;
  messageTraits(): Record<string, MessageTraitInterface>;
  correlationIds(): Record<string, CorrelationIdInterface>;
  securitySchemes(): Record<string, SecuritySchemeInterface>;
  serverBindings(): Record<string, BindingsInterface>;
  channelBindings(): Record<string, BindingsInterface>;
  operationBindings(): Record<string, BindingsInterface>;
  messageBindings(): Record<string, BindingsInterface>;
}
