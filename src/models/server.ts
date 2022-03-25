import { BaseModel } from "./base";
import { BindingsMixinInterface, DescriptionMixinInterface } from './mixins';

export interface ServerInterface extends BaseModel, DescriptionMixinInterface, BindingsMixinInterface {
    name(): string | undefined;
    protocol(): string | undefined;
    protocolVersion(): string;
    hasProtocolVersion(): boolean;
    url(): string;
}