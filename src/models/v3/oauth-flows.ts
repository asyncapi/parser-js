
import { OAuthFlowsInterface } from '../oauth-flows';
import { BaseModel } from '../base';
import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';
import { OAuthFlowInterface } from '../oauth-flow';
import { OAuthFlow } from './oauth-flow';

export class OAuthFlows extends Mixin(BaseModel, ExtensionsMixin) implements OAuthFlowsInterface {
    hasAuthorizationCode(): boolean {
        return !!this._json.authorizationCode;
    }
    authorizationCode(): OAuthFlowInterface | undefined {
        if (!this._json.authorizationCode) return undefined;
        return new OAuthFlow(this._json.authorizationCode);
    }
    hasClientCredentials(): boolean {
        return !!this._json.clientCredentials;
    }
    clientCredentials(): OAuthFlowInterface | undefined {
        if (!this._json.clientCredentials) return undefined;
        return new OAuthFlow(this._json.clientCredentials);
    }
    hasImplicit(): boolean {
        return !!this._json.implicit;
    }
    implicit(): OAuthFlowInterface | undefined {
        if (!this._json.implicit) return undefined;
        return new OAuthFlow(this._json.implicit);
    }
    hasPassword(): boolean {
        return !!this._json.password;
    }
    password(): OAuthFlowInterface | undefined {
        if (!this._json.password) return undefined;
        return new OAuthFlow(this._json.password);
    }


}