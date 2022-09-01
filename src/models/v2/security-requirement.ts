import { BaseModel } from '../base';
import type { SecuritySchemeInterface } from '../security-scheme';
import type { v2 } from "../../spec-types";
import { SecurityRequirementInterface } from 'models/security-requirement';
import { SecurityScheme } from './security-scheme';

export class SecurityRequirement extends BaseModel<{}, { id: string, scheme: SecuritySchemeInterface }> implements SecurityRequirementInterface {
  scheme(): SecuritySchemeInterface {
    return this.meta().scheme;
  }

  scopes() : string[] {
    return this._json as string[];
  }
}