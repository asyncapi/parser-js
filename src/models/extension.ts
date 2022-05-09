import type { BaseModel } from "./base";

export interface ExtensionInterface extends BaseModel {
  name(): string;
  version(): string;
  value(): any;
}
