import { BaseModel } from '../base';
import { OAuthFlows } from './oauth-flows';
import { hasDescription, description, extensions } from './mixins';
export class SecurityScheme extends BaseModel {
    id() {
        return this._meta.id;
    }
    hasDescription() {
        return hasDescription(this);
    }
    description() {
        return description(this);
    }
    hasBearerFormat() {
        return !!this._json.bearerFormat;
    }
    bearerFormat() {
        return this._json.bearerFormat;
    }
    openIdConnectUrl() {
        return this._json.openIdConnectUrl;
    }
    scheme() {
        return this._json.scheme;
    }
    flows() {
        if (!this._json.flows)
            return undefined;
        return new OAuthFlows(this._json.flows);
    }
    type() {
        return this._json.type;
    }
    in() {
        return this._json.in;
    }
    extensions() {
        return extensions(this);
    }
}
