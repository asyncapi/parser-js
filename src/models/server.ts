import { BaseModel } from "./base";
import { ServerSecurityRequirementInterface } from "./server-security-requirement";
import { ServerVariableInterface } from "./server-variables";
import { BindingsMixinInterface, DescriptionMixinInterface, SpecificationExtensionsMixinInterface } from './mixins';

export interface ServerInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, SpecificationExtensionsMixinInterface {
    url(): string;
    hasUrl(): boolean;
    protocol(): string;
    hasProtocol(): boolean;
    protocolVersion(): string | undefined;
    hasProtocolVersion(): boolean;
    variables(): Record<string, ServerVariableInterface>;
    variables(): Record<string, ServerVariableInterface> | undefined;
    variable(name: string): ServerVariableInterface | undefined;
    hasVariables(): boolean;
    security(): [ServerSecurityRequirementInterface] | undefined;
}