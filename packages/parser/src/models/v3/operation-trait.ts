import { SecurityScheme } from './security-scheme';
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';

import { CoreModel } from './mixins';

import type { OperationTraitInterface } from '../operation-trait';

import type { v3 } from '../../spec-types';

export class OperationTrait<J extends v3.OperationTraitObject = v3.OperationTraitObject> extends CoreModel<J, { id: string | undefined }> implements OperationTraitInterface {
  id(): string | undefined {
    return this.operationId() || this._meta.id;
  }

  hasOperationId(): boolean {
    return !!this._meta.id;
  }

  operationId(): string | undefined {
    return this._meta.id;
  }

  security(): SecurityRequirements[] {
    const securitySchemes = (this._meta?.asyncapi?.parsed?.components?.securitySchemes || {}) as Record<string, v3.SecuritySchemeObject>;
    return (this._json.security || []).map((requirement, index) => {
      const requirements: SecurityRequirement[] = [];
      
      // Check if this is a reference
      const isReference = requirement && typeof requirement === 'object' && '$ref' in requirement;
      // Check if this is a SecuritySchemeObject (has 'type' property)
      const isSecurityScheme = requirement && typeof requirement === 'object' && 'type' in requirement;
      
      if (!isReference && !isSecurityScheme && requirement && typeof requirement === 'object') {
        // New format: SecurityRequirementObject (Record<string, Array<SecuritySchemeObject>>)
        Object.entries(requirement as v3.SecurityRequirementObject).forEach(([security, schemes]) => {
          schemes.forEach((schemeData, schemeIndex) => {
            const scheme = this.createModel(SecurityScheme, securitySchemes[security] || schemeData, { id: security, pointer: `/components/securitySchemes/${security}` });
            requirements.push(
              this.createModel(SecurityRequirement, { scheme, scopes: (schemeData as v3.SecuritySchemeObject).scopes || [] }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}/${schemeIndex}` })
            );
          });
        });
      } else {
        // Old format: direct SecuritySchemeObject or ReferenceObject (for backward compatibility)
        const scheme = this.createModel(SecurityScheme, requirement as v3.SecuritySchemeObject, { id: '', pointer: this.jsonPath(`security/${index}`) });
        requirements.push(
          this.createModel(SecurityRequirement, { scheme, scopes: (requirement as v3.SecuritySchemeObject).scopes || [] }, { id: '', pointer: this.jsonPath(`security/${index}`) })
        );
      }
      
      return new SecurityRequirements(requirements);
    });
  }
}
