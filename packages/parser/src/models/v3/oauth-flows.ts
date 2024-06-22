import { BaseModel } from '../base';
import { OAuthFlow } from './oauth-flow';

import { extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowsInterface } from '../oauth-flows';
import type { OAuthFlowInterface } from '../oauth-flow';

import type { v3 } from '../../spec-types';

export class OAuthFlows extends BaseModel<v3.OAuthFlowsObject> implements OAuthFlowsInterface {
  hasAuthorizationCode(): boolean {
    return !!this._json.authorizationCode;
  }
  
  authorizationCode(): OAuthFlowInterface<v3.OAuthFlowObjectAuthorizationCode> | undefined {
    if (!this._json.authorizationCode) return undefined;
    return new OAuthFlow(this._json.authorizationCode);
  }
  
  hasClientCredentials(): boolean {
    return !!this._json.clientCredentials;
  }
  
  clientCredentials(): OAuthFlowInterface<v3.OAuthFlowObjectClientCredentials> | undefined {
    if (!this._json.clientCredentials) return undefined;
    return new OAuthFlow(this._json.clientCredentials);
  }
  
  hasImplicit(): boolean {
    return !!this._json.implicit;
  }
  
  implicit(): OAuthFlowInterface<v3.OAuthFlowObjectImplicit> | undefined {
    if (!this._json.implicit) return undefined;
    return new OAuthFlow(this._json.implicit);
  }
  
  hasPassword(): boolean {
    return !!this._json.password;
  }
  
  password(): OAuthFlowInterface<v3.OAuthFlowObjectPassword> | undefined {
    if (!this._json.password) return undefined;
    return new OAuthFlow(this._json.password);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}