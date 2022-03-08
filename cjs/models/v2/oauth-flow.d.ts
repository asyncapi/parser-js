import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { OAuthFlowInterface } from '../oauth-flow';
import type { v2 } from '../../spec-types';
export declare class OAuthFlow<F extends v2.OAuthFlowObjectBase> extends BaseModel<F> implements OAuthFlowInterface {
    authorizationUrl(): string | undefined;
    hasRefreshUrl(): boolean;
    refreshUrl(): string | undefined;
    scopes(): Record<string, string> | undefined;
    tokenUrl(): string | undefined;
    extensions(): ExtensionsInterface;
}
