import { BaseModel } from '../base';

import { Mixin } from '../utils';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import type { ModelMetadata } from '../base';
import type { ServerVariableInterface } from '../server-variable';

export class ServerVariable extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin) implements ServerVariableInterface {
  constructor(
    _json: Record<string,any>,
    protected readonly _meta: ModelMetadata & { id: string } = {} as any
  ) {
    super(_json, _meta);
  }
  
  id(): string {
    return this._meta.id;
  }

  hasDefaultValue(): boolean {
    return !!this._json.default
  }
  
  defaultValue(): string | undefined {
    return this._json.default;
  }
  
  hasAllowedValues(): boolean {
    return !!this._json.enum;
  }

  allowedValues(): Array<string> {
    return this._json.enum;
  }
  
  examples(): Array<string> {
    return this._json.examples
  }
}
