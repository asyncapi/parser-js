import { SpecificationExtensionsModel } from './mixins';

import type { v2 } from '../spec-types';

export class OAuthFlow extends SpecificationExtensionsModel<v2.OAuthFlowObject> {
  authorizationUrl() {
    return this._json.authorizationUrl;
  }

  tokenUrl() {
    return this._json.tokenUrl;
  }

  refreshUrl() {
    return this._json.refreshUrl;
  }

  scopes() {
    return this._json.scopes;
  }
}