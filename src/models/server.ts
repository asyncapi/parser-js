import type { BaseModel } from "./base";
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
import type { ServerVariablesInterface } from "./server-variables";
import type { SecuritySchemeInterface } from "./security-scheme";

export interface ServerInterface extends BaseModel, DescriptionMixinInterface, BindingsMixinInterface, ExtensionsMixinInterface {
  id(): string
  url(): string;
  protocol(): string;
  protocolVersion(): string;
  hasProtocolVersion(): boolean;
  variables(): ServerVariablesInterface;
  security(): Array<Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }>>;
}
