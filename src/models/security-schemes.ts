import { Collection} from './collection';
import type { SecuritySchemeInterface } from './security-scheme';

export type SecuritySchemesInterface = Collection<SecuritySchemeInterface>

export class SecuritySchemes extends Collection<SecuritySchemeInterface> implements SecuritySchemesInterface {
  override get(id: string): SecuritySchemeInterface | undefined {
    return this.collections.find(securityScheme => securityScheme.id() === id);
  }
}
