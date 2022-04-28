import type { BaseModel } from "./base";
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
import type { ServerVariablesInterface } from "./server-variables";

export interface ServerInterface extends BaseModel, DescriptionMixinInterface, BindingsMixinInterface, ExtensionsMixinInterface {
  id(): string
  url(): string;
  protocol(): string | undefined;
  protocolVersion(): string;
  hasProtocolVersion(): boolean;
  variables(): ServerVariablesInterface
}