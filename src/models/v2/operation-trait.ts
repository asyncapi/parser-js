import { SecurityScheme } from './security-scheme';
import { SecurityRequirements } from '../security-requirements';
import { SecurityRequirement } from './security-requirement';

import { CoreModel } from './mixins';

import type { OperationAction } from '../operation';
import type { OperationTraitInterface } from '../operation-trait';

import type { v2 } from '../../spec-types';

export class OperationTrait<J extends v2.OperationTraitObject = v2.OperationTraitObject> extends CoreModel<J, { id: string | undefined, action: OperationAction }> implements OperationTraitInterface {
  id(): string | undefined {
    return this._json.operationId || this._meta.id;
  }

  hasId(): boolean {
    return this.id() !== undefined;
  }

  security(): SecurityRequirements[] {
    const securitySchemes = (this._meta?.asyncapi?.parsed?.components?.securitySchemes || {}) as Record<string, v2.SecuritySchemeObject>;
    return (this._json.security || []).map((requirement, index) => {
      const requirements: SecurityRequirement[] = [];
      Object.entries(requirement).forEach(([security, scopes]) => {
        const scheme = this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` });
        requirements.push(
          this.createModel(SecurityRequirement, { scheme, scopes }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}` })
        );
      });
      return new SecurityRequirements(requirements);
    });
  }
}
