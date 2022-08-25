import type { BaseModel } from "./base";
import type { ChannelsInterface } from './channels'
import type { MessagesInterface } from './messages'
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
import type { OperationsInterface } from './operations'
import type { ServerVariablesInterface } from "./server-variables";
import type { SecuritySchemeInterface } from "./security-scheme";

export interface ServerInterface extends BaseModel, DescriptionMixinInterface, BindingsMixinInterface, ExtensionsMixinInterface {
  id(): string
  url(): string;
  protocol(): string;
  protocolVersion(): string;
  hasProtocolVersion(): boolean;
  channels(): ChannelsInterface;
  operations(): OperationsInterface;
  messages(): MessagesInterface;
  variables(): ServerVariablesInterface;
  security(): Array<Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }>>;
}