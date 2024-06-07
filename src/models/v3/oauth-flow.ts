import { BaseModel } from '../base';

import { extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowInterface } from '../oauth-flow';

import type { v3 } from '../../spec-types';

export class OAuthFlow<F extends v3.OAuthFlowObjectBase> extends BaseModel<F> implements OAuthFlowInterface {
  hasAuthorizationUrl(): boolean {
    return !!this.json<v3.OAuthFlowObjectAuthorizationCode>().authorizationUrl;
  }

  authorizationUrl(): string | undefined {
    return this.json<v3.OAuthFlowObjectAuthorizationCode>().authorizationUrl;
  }

  hasRefreshUrl(): boolean {
    return !!this._json.refreshUrl;
  }
  
  refreshUrl(): string | undefined {
    return this._json.refreshUrl;
  }
  
  scopes(): Record<string, string> | undefined {
    return this._json.availableScopes;
  }

  hasTokenUrl(): boolean {    
    return !!this.json<Extract<v3.OAuthFlowObject, v3.OAuthFlowObjectImplicit>>().tokenUrl;
  }

  tokenUrl(): string | undefined {    
    return this.json<Extract<v3.OAuthFlowObject, v3.OAuthFlowObjectImplicit>>().tokenUrl;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
