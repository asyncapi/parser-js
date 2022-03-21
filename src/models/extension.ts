import type { BaseModel } from "./base";

export interface ExtensionInterface extends BaseModel {
  id(): string;
  version(): string;
  value(): any;
}
