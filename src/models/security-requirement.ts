import type { BaseModel } from "./base";
import type { SecuritySchemeInterface } from "./security-scheme";

export interface SecurityRequirementInterface extends BaseModel {
  requirements(): Record<string, { schema: SecuritySchemeInterface, scopes: Array<string> }>;
}
