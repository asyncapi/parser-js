import { BaseModel } from "./base";
import { ServerSecurityRequirementInterface } from "./server-security-requirement";
import { ServerVariableInterface } from "./server-variables";
import {BindingsMixinInterface, DescriptionMixinInterface, SpecificationExtensionsMixinInterface} from './mixins';

export interface ServerInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, SpecificationExtensionsMixinInterface {
    url(): string;
    protocol(): string;
    protocolVersion(): string
    variables(): Record<string, ServerVariableInterface>;
    variable(name: string): ServerVariableInterface;
    hasVariables(): boolean;
    security(): [ServerSecurityRequirementInterface] | undefined;
}