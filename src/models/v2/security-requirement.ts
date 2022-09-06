import { BaseModel } from '../base';

import type { SecuritySchemeInterface } from '../security-scheme';
import type { SecurityRequirementInterface } from '../security-requirement';

export class SecurityRequirement extends BaseModel<{ scopes?: string[], scheme: SecuritySchemeInterface }, { id?: string }> implements SecurityRequirementInterface {
  scheme(): SecuritySchemeInterface {
    return this._json.scheme;
  }

  scopes(): string[] {
    return this._json.scopes || [];
  }
}