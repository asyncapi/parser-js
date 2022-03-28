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
        throw new Error('Method not implemented.');
    }
    allowedValue(): string | undefined {
        throw new Error('Method not implemented.');
    }
    examples(): string[] {
        return this._json.examples
    }

}