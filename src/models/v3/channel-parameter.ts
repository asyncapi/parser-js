import { BaseModel } from '../base';
import { Schema } from './schema';

import { hasDescription, description, extensions } from './mixins';

import type { ChannelParameterInterface } from '../channel-parameter';
import type { SchemaInterface } from '../schema';
import type { ExtensionsInterface } from '../extensions';

import type { v3 } from '../../spec-types';

export class ChannelParameter extends BaseModel<v3.ParameterObject, { id: string }> implements ChannelParameterInterface {
  id(): string {
    return this._meta.id;
  }

  hasSchema(): boolean {
    return !!this._json.schema;
  }

  schema(): SchemaInterface | undefined {
    if (!this._json.schema) return undefined;
    return this.createModel(Schema, this._json.schema, { pointer: `${this._meta.pointer}/schema` });
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
