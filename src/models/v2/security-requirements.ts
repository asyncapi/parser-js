import { Collection } from '../collection';

import type { SecurityRequirementsInterface } from '../security-requirements';
import type { SecurityRequirementInterface } from '../security-requirement';

export class SecurityRequirements extends Collection<SecurityRequirementInterface> implements SecurityRequirementsInterface {
  protected override __get(id: string): SecurityRequirementInterface | undefined {
    return this.collections.find(securityRequirement => securityRequirement.json('schemaId') === id);
  }
}
