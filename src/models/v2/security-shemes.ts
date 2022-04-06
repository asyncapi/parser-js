import { SecuritySchemesInterface } from '../security-schemes';
import { Collection } from '../collection';
import { SecuritySchemeInterface } from '../security-scheme';

export class SecurityVariables extends Collection<SecuritySchemeInterface> implements SecuritySchemesInterface {
    get(id: string): SecuritySchemeInterface | undefined {
        return this.collections.find(securityScheme => securityScheme.id() === id);
    }
    has(id: string): boolean {
        return this.collections.some(securityScheme => securityScheme.id() === id);
    }
}