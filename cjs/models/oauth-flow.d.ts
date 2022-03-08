import { BaseModel } from './base';
import { ExtensionsMixinInterface } from './mixins';
export interface OAuthFlowInterface<J extends Record<string, any> = Record<string, any>> extends BaseModel<J>, ExtensionsMixinInterface {
    authorizationUrl(): string | undefined;
    hasRefreshUrl(): boolean;
    refreshUrl(): string | undefined;
    scopes(): Record<string, string> | undefined;
    tokenUrl(): string | undefined;
}
