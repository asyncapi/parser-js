import { BaseModel } from '../base';
import { extensions } from './mixins';
export class OAuthFlow extends BaseModel {
    authorizationUrl() {
        return this.json().authorizationUrl;
    }
    hasRefreshUrl() {
        return !!this._json.refreshUrl;
    }
    refreshUrl() {
        return this._json.refreshUrl;
    }
    scopes() {
        return this._json.scopes;
    }
    tokenUrl() {
        return this.json().tokenUrl;
    }
    extensions() {
        return extensions(this);
    }
}
