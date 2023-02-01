import { SecurityScheme } from './security-scheme';
import { SecurityRequirements } from '../security-requirements';
import { SecurityRequirement } from './security-requirement';

import { CoreModel } from './mixins';

import type { OperationTraitInterface } from '../operation-trait';

import type { v3 } from '../../spec-types';

export class OperationTrait<J extends v3.OperationTraitObject = v3.OperationTraitObject> extends CoreModel<J, { id: string | undefined }> implements OperationTraitInterface {
  id(): string | undefined {
    return this._meta.id;
  }

  hasId(): boolean {
    return this.id() !== undefined;
  }

  security(): SecurityRequirements[] {
    return (this._json.security || []).map((security, index) => {
      const scheme = this.createModel(SecurityScheme, security as v3.SecuritySchemeObject, { id: '', pointer: this.jsonPath(`security/${index}`) });
      const requirement = this.createModel(SecurityRequirement, { scheme, scopes: (security as v3.SecuritySchemeObject).scopes }, { id: '', pointer: this.jsonPath(`security/${index}`) });
      return new SecurityRequirements([requirement]);
    });
  }
}
