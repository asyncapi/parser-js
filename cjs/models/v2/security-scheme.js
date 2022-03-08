"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityScheme = void 0;
const base_1 = require("../base");
const oauth_flows_1 = require("./oauth-flows");
const mixins_1 = require("./mixins");
class SecurityScheme extends base_1.BaseModel {
    id() {
        return this._meta.id;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
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
        return new oauth_flows_1.OAuthFlows(this._json.flows);
    }
    type() {
        return this._json.type;
    }
    in() {
        return this._json.in;
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.SecurityScheme = SecurityScheme;
