import { BaseModel } from '../base';

import { hasDescription, description, extensions } from './mixins';

import type { ChannelParameterInterface } from '../channel-parameter';
import type { SchemaInterface } from '../schema';
import type { ExtensionsInterface } from '../extensions';

import type { v3 } from '../../spec-types';
import { ParameterSchema } from './channel-parameter-schema';

export class ChannelParameter extends BaseModel<v3.ParameterObject, { id: string }> implements ChannelParameterInterface {
  id(): string {
    return this._meta.id;
  }

  hasSchema(): boolean {
    return this._json && (
      this._json.default !== undefined || 
      this._json.enum !== undefined || 
      this._json.examples !== undefined
    );
  }

  schema(): SchemaInterface | undefined {
    if (!this.hasSchema()) return undefined;
    return this.createModel(ParameterSchema, this._json, { pointer: `${this._meta.pointer}` });
  }

  hasLocation(): boolean {
    return !!this._json.location;
  }

  location(): string | undefined {
    return this._json.location;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
