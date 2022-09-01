import { BaseModel } from '../base';

import type { SecuritySchemeInterface } from '../security-scheme';
import type { SecurityRequirementInterface } from '../security-requirement';

export class SecurityRequirement extends BaseModel<{ schemaId?: string, scopes?: string[], scheme: SecuritySchemeInterface }> implements SecurityRequirementInterface {
  scheme(): SecuritySchemeInterface {
    return this._json.scheme;
  }

  scopes(): string[] {
    return this._json.scopes || [];
  }
}