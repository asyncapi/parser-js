import { SpecificationExtensionsModel, description, hasDescription, createMapOfType, bindingsMixins, getMapValue } from './mixins';
import { ServerVariable } from './server-variable';
import { SecurityRequirement } from './security-requirement';

import type { v2 } from '../spec-types';

export class Server extends SpecificationExtensionsModel<v2.ServerObject> {
  url() {
    return this._json.url;
  }

  protocol() {
    return this._json.protocol;
  }

  protocolVersion() {
    return this._json.protocolVersion;
  }

  description() {
    return description(this);
  }

  hasDescription() {
    return hasDescription(this);
  }

  variables() {
    return createMapOfType(this._json.variables, ServerVariable);
  }

  variable(name: string) {
    return getMapValue(this._json.variables, name, ServerVariable);
  }

  hasVariables() {
    return !!this._json.variables;
  }

  security() {
    if (!this._json.security) return null;
    return this._json.security.map(sec => new SecurityRequirement(sec));
  }

  hasBindings() {
    return bindingsMixins.hasBindings(this as any);
  }

  bindings() {
    return bindingsMixins.bindings(this as any);
  }

  bindingProtocols() {
    return bindingsMixins.bindingProtocols(this as any);
  }

  hasBinding(name: string): boolean {
    return bindingsMixins.hasBinding(this as any, name);
  }

  binding(name: string) {
    return bindingsMixins.binding(this as any, name);
  }
}
