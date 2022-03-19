import type { BaseModel } from "./base";
import type { ExtensionsMixinInterface } from './mixins';

export interface BindingInterface extends BaseModel, ExtensionsMixinInterface {
  protocol(): string;
  version(): string;
  value(): any;
}