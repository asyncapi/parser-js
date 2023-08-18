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

import type { v2, v3 } from '../spec-types';

// https://github.com/asyncapi/parser-api/releases/tag/v2.0.0
export const ParserAPIVersion = '2.0.0';

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
}
