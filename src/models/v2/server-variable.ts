import {ServerVariableInterface} from '../server-variables';
import {BaseModel} from '../base';

export class ServerVariable extends BaseModel implements ServerVariableInterface {
    allowedValues(): any[] {
        return this.json('enum');
    }

    allows(name: string): boolean {
        if(this.json('enum') === undefined) return true;
        return this.json('enum').includes(name);
    }

    hasAllowedValues(): boolean {
        return this.json('enum') !== undefined;
    }

    defaultValue(): string {
        return this.json('default');
    }

    hasDefaultValue(): boolean {
        return this.json('default') !== undefined;
    }

    examples(): [string] {
        return this.json('examples');
    }
}