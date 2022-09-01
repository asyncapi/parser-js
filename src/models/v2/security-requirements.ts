import { Collection } from '../collection';

import type { SecurityRequirementsInterface } from '../security-requirements';
import type { SecurityRequirementInterface } from '../security-requirement';

export class SecurityRequirements extends Collection<SecurityRequirementInterface> implements SecurityRequirementsInterface {
  override get(id: string): SecurityRequirementInterface | undefined {
    return this.collections.find(securityRequirement => securityRequirement.meta().id === id);
  }
  
  override has(id: string): boolean {
    return this.collections.some(securityRequirement => securityRequirement.meta().id === id);
  }
}
