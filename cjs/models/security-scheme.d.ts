import type { BaseModel } from './base';
import type { OAuthFlowsInterface } from './oauth-flows';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
export interface SecuritySchemeInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
    id(): string;
    hasBearerFormat(): boolean;
    bearerFormat(): string | undefined;
    openIdConnectUrl(): string | undefined;
    scheme(): string | undefined;
    flows(): OAuthFlowsInterface | undefined;
    type(): string;
    in(): string | undefined;
}
