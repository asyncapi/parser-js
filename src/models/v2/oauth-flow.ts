import { BaseModel } from '../base';

import { extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowInterface } from '../oauth-flow';

import type { v2 } from "../../spec-types";

export class OAuthFlow<F extends v2.OAuthFlowObjectBase> extends BaseModel<F> implements OAuthFlowInterface {
  authorizationUrl(): string | undefined {
    return this.json<v2.OAuthFlowObjectAuthorizationCode>().authorizationUrl;
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

  tokenUrl(): string | undefined {    
    return this.json<Extract<v2.OAuthFlowObject, v2.OAuthFlowObjectImplicit>>().tokenUrl;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}