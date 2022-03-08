import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { SecuritySchemeInterface } from '../security-scheme';
import type { OAuthFlowsInterface } from '../oauth-flows';
import type { v2 } from '../../spec-types';
export declare class SecurityScheme extends BaseModel<v2.SecuritySchemeObject, {
    id: string;
}> implements SecuritySchemeInterface {
    id(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    hasBearerFormat(): boolean;
    bearerFormat(): string | undefined;
    openIdConnectUrl(): string | undefined;
    scheme(): string | undefined;
    flows(): OAuthFlowsInterface | undefined;
    type(): v2.SecuritySchemeType;
    in(): v2.SecuritySchemaLocation | undefined;
    extensions(): ExtensionsInterface;
}
