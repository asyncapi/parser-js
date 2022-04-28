import { OAuthFlowInterface } from '../oauth-flow';
import { BaseModel } from '../base';
import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

export class OAuthFlow extends Mixin(BaseModel, ExtensionsMixin) implements OAuthFlowInterface {
    authorizationUrl(): string | undefined {
        return this._json.authorizationUrl;
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
        return this._json.tokenUrl;
    }

}