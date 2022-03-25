import { BaseModel } from "./base";
import { BindingsMixinInterface, DescriptionMixinInterface } from './mixins';

export interface ServerInterface extends BaseModel, DescriptionMixinInterface, BindingsMixinInterface {
    id(): string
    protocol(): string | undefined;
    protocolVersion(): string;
    hasProtocolVersion(): boolean;
    url(): string;
}