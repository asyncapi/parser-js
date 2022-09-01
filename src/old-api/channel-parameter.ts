import { SpecificationExtensionsModel, description, hasDescription } from './mixins';
import { Schema } from './schema';

import type { v2 } from '../spec-types';

export class ChannelParameter extends SpecificationExtensionsModel<v2.ParameterObject> {
  description() {
    return description(this);
  }

  hasDescription() {
    return hasDescription(this);
  }
  
  schema() {
    if (!this._json.schema) return null;
    return new Schema(this._json.schema);
  }

  location() {
    return this._json.location;
  }
}