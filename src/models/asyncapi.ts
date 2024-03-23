import type { BaseModel } from './base';
import type { InfoInterface } from './info';
import type { ChannelsInterface } from './channels';
import type { ComponentsInterface } from './components';
import type { MessagesInterface } from './messages';
import type { ExtensionsMixinInterface } from './mixins';
import type { OperationsInterface } from './operations';
import type { SchemasInterface } from './schemas';
import type { SecuritySchemesInterface } from './security-schemes';
import type { ServersInterface } from './servers';
import type { ServerVariablesInterface } from './server-variables';
import type { ChannelParametersInterface } from './channel-parameters';
import type { CorrelationIdsInterface } from './correlation-ids';
import type { TagsInterface } from './tags';
import type { OperationTraitsInterface } from './operation-traits';
import type { MessageTraitsInterface } from './message-traits';
import type { BindingsInterface } from './bindings';

import type { v2, v3 } from '../spec-types';

// https://github.com/asyncapi/parser-api/releases/tag/v3.0.0
export const ParserAPIVersion = 3;

export interface AsyncAPIDocumentInterface extends BaseModel<v2.AsyncAPIObject | v3.AsyncAPIObject>, ExtensionsMixinInterface {
  version(): string;
  defaultContentType(): string | undefined;
  hasDefaultContentType(): boolean;
  info(): InfoInterface;
  servers(): ServersInterface;
  channels(): ChannelsInterface;
  operations(): OperationsInterface;
  messages(): MessagesInterface;
  schemas(): SchemasInterface;
  securitySchemes(): SecuritySchemesInterface;
  components(): ComponentsInterface;
  allServers(): ServersInterface;
  allChannels(): ChannelsInterface;
  allOperations(): OperationsInterface;
  allMessages(): MessagesInterface;
  allSchemas(): SchemasInterface;
  allSecuritySchemes(): SecuritySchemesInterface;
  allServerVariables(): ServerVariablesInterface;
  allParameters(): ChannelParametersInterface;
  allCorrelationIds(): CorrelationIdsInterface;
  allTags(): TagsInterface;
  allOperationTraits(): OperationTraitsInterface;
  allMessageTraits(): MessageTraitsInterface;
  allServerBindings(): BindingsInterface;
  allChannelBindings(): BindingsInterface;
  allOperationBindings(): BindingsInterface;
  allMessageBindings(): BindingsInterface;
}
