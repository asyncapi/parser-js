import type { BaseModel } from "./base";
import type { ExtensionsMixinInterface } from './mixins';

export interface MessageExampleInterface extends BaseModel, ExtensionsMixinInterface {
  hasName(): boolean;
  name(): string;
  hasSummary(): boolean;
  summary(): string;
  hasHeaders(): boolean;
  headers(): Record<string, any> | undefined;
  hasPayload(): boolean;
  payload(): Record<string, any> | undefined;
}
