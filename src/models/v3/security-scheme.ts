import { BaseModel, ModelMetadata } from '../base';
import { Mixin } from '../utils';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';
import { SecuritySchemaType, SecuritySchemeInterface } from '../security-scheme';
import { OAuthFlowsInterface } from 'models/oauth-flows';
import { OAuthFlows } from './oauth-flows';

export class SecurityScheme extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin) implements SecuritySchemeInterface {
    constructor(
        private readonly _id: string,
        _json: Record<string, any>,
        _meta: ModelMetadata = {} as any
    ) {
        super(_json, _meta);
    }

    id(): string {
        return this._id;
    }

    hasBearerFormat(): boolean {
        return !!this._json.bearerFormat;
    }

    bearerFormat(): string | undefined {
        return this._json.bearerFormat;
    }

    openIdConnectUrl(): string {
        return this._json.openIdConnectUrl;
    }

    scheme(): string | undefined {
        return this._json.scheme
    }

    flows(): OAuthFlowsInterface | undefined {
        if(!this._json.flows) return undefined;
        return new OAuthFlows(this._json.flows);
    }

    scopes(): string[] {
        return this._json.scopes;
    }

    type(): SecuritySchemaType {
        return this._json.type;
    }

    in(): string | undefined {
        return this._json.in;
    }

}