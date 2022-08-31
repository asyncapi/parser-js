import { Collection } from '../collection';

import type { SecuritySchemesInterface } from '../security-schemes';
import type { SecuritySchemeInterface } from '../security-scheme';

export class SecuritySchemes extends Collection<SecuritySchemeInterface> implements SecuritySchemesInterface {
  protected override __get(id: string): SecuritySchemeInterface | undefined {
    return this.collections.find(securityScheme => securityScheme.id() === id);
  }
}
