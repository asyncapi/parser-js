import { BaseModel } from "./base";
import { ServerSecurityRequirementInterface } from "./server-security-requirement";
import { ServerVariableInterface } from "./server-variables";

export interface ServerInterface extends BaseModel {
    url(): string;
    protocol(): string;
    protocolVersion(): string
    variables(): Record<string, ServerVariableInterface>;
    variable(name: string): ServerVariableInterface;
    hasVariables(): boolean;
    security(): [ServerSecurityRequirementInterface] | undefined;
}