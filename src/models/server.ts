import { BaseModel } from "./base";
import { ServerSecurityRequirementInterface } from "./server-security-requirement";
import { ServerVariableInterface } from "./server-variables";
import { BindingsMixinInterface, DescriptionMixinInterface, SpecificationExtensionsMixinInterface } from './mixins';

export interface ServerInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, SpecificationExtensionsMixinInterface {
    url(): string;
    protocol(): string;
    protocolVersion(): string | undefined;
    hasProtocolVersion(): boolean;
    variables(): Record<string, ServerVariableInterface> | undefined;
    variables(name: string): ServerVariableInterface | undefined;
    hasVariables(): boolean;
    hasVariables(name: string): boolean;
    security(): ServerSecurityRequirementInterface[] | undefined;
    hasSecurity(): boolean;
}