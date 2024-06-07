import { BaseModel } from '../base';

import { hasDescription, description, extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { ServerVariableInterface } from '../server-variable';

import type { v3 } from '../../spec-types';

export class ServerVariable extends BaseModel<v3.ServerVariableObject, { id: string }> implements ServerVariableInterface {  
  id(): string {
    return this._meta.id;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasDefaultValue(): boolean {
    return !!this._json.default;
  }
  
  defaultValue(): string | undefined {
    return this._json.default;
  }
  
  hasAllowedValues(): boolean {
    return !!this._json.enum;
  }

  allowedValues(): Array<string> {
    return this._json.enum || [];
  }
  
  examples(): Array<string> {
    return this._json.examples || [];
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
