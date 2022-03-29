import { BaseModel } from '../base';
import { Mixin } from '../utils';
import { ServerVariableInterface } from '../server-variable';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';


export class ServerVariable extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin) implements ServerVariableInterface {
    id(): string {
        throw new Error('Method not implemented.');
    }
    hasDefaultValue(): boolean {
        return !!this._json.default
    }
    defaultValue(): string | undefined {
        return this._json.default;
    }
    hasAllowedValue(): boolean {
        return !!this._json.enum
    }
    allowedValue(): any[] {
        return this._json.enum
    }
    examples(): string[] {
        return this._json.examples
    }

}