import { BaseModel } from "./base";

export interface ServerVariableInterface extends BaseModel {
    allowedValues(): any[];
    allows(name: string): boolean;
    hasAllowedValues(): boolean;
    defaultValue(): string;
    hasDefaultValue(): boolean;
    examples(): [string]
}
