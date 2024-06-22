import { BaseModel } from '../base';

import { extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowInterface } from '../oauth-flow';

import type { v2 } from '../../spec-types';

export class OAuthFlow<F extends v2.OAuthFlowObjectBase> extends BaseModel<F> implements OAuthFlowInterface {
  hasAuthorizationUrl(): boolean {
    return !!this.json<v2.OAuthFlowObjectAuthorizationCode>().authorizationUrl;
  }

  authorizationUrl(): string | undefined {
    return this.json<v2.OAuthFlowObjectAuthorizationCode>().authorizationUrl;
  }

  hasTokenUrl(): boolean {    
    return !!this.json<Extract<v2.OAuthFlowObject, v2.OAuthFlowObjectImplicit>>().tokenUrl;
  }

  tokenUrl(): string | undefined {    
    return this.json<Extract<v2.OAuthFlowObject, v2.OAuthFlowObjectImplicit>>().tokenUrl;
  }

  hasRefreshUrl(): boolean {
    return !!this._json.refreshUrl;
  }
  
  refreshUrl(): string | undefined {
    return this._json.refreshUrl;
  }
  
  scopes(): Record<string, string> | undefined {
    return this._json.scopes;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}