import { BaseModel } from './base';
import { ExtensionsMixinInterface } from './mixins';

export interface OAuthFlowInterface extends BaseModel, ExtensionsMixinInterface {
    authorizationUrl(): string | undefined;
    hasRefreshUrl(): boolean;
    refreshUrl(): string | undefined;
    scopes(): Record<string, string> | undefined;
    tokenUrl(): string | undefined;
}