import {BaseModel} from './base';
import { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';

export interface ServerVariableInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
    id(): string;
    hasDefaultValue(): boolean;
    defaultValue(): string | undefined;
    hasAllowedValue(): boolean;
    allowedValue(): any[]
    examples(): Array<string>
}