import { BaseModel } from "../base";
import { SecurityScheme } from "./security-scheme";

import type { SecurityRequirementInterface } from "../security-requirement";
import type { SecuritySchemeInterface } from "../security-scheme";

export class SecurityRequirement extends BaseModel implements SecurityRequirementInterface {
  requirements(): Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }> {
    let requirements: Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }> = {};
    const securitySchemes = this._meta?.asyncapi?.parsed.components.securitySchemes || {};
    Object.entries(this._json).forEach(([security, scopes]) => {
      requirements[security] = {
        schema: this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` }),
        scopes,
      }
    });
    return requirements;
  }
}
