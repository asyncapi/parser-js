import { SpecificationExtensionsModel, description, hasDescription } from './mixins';

import type { v2 } from '../spec-types';

export class CorrelationId extends SpecificationExtensionsModel<v2.CorrelationIDObject> {
  description() {
    return description(this);
  }

  hasDescription() {
    return hasDescription(this);
  }

  location() {
    return this._json.location;
  }
}