import { SpecificationExtensionsModel, description, hasDescription, createMapOfType } from './mixins';
import { OAuthFlow } from './oauth-flow';

import type { v2 } from '../spec-types';

export class SecurityScheme extends SpecificationExtensionsModel<v2.SecuritySchemeObject> { // TODO: Add bindings and tags
  type() {
    return this._json.type;
  }

  description() {
    return description(this);
  }

  hasDescription() {
    return hasDescription(this);
  }

  name() {
    return this._json.name;
  }

  in() {
    return this._json.in;
  }

  scheme() {
    return this._json.scheme;
  }

  bearerFormat() {
    return this._json.bearerFormat;
  }

  openIdConnectUrl() {
    return this._json.openIdConnectUrl;
  }

  flows() {
    return createMapOfType(this._json.flows as Record<string, v2.OAuthFlowObject>, OAuthFlow);
  }
}
