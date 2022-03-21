import { BaseModel } from "./base";
import { BindingsMixinInterface, DescriptionMixinInterface } from './mixins';

export interface ServerInterface extends BaseModel, DescriptionMixinInterface, BindingsMixinInterface {
    id(): string;
    name(): string | undefined;
    hasName(): boolean;
    protocol(): string | undefined;
    hasProtocol(): boolean;
    protocolVersion(): string;
    hasProtocolVersion(): boolean;
    url(): string;
    hasUrl(): boolean;
}