import { SpecificationExtensionsModel, hasDescription, description, hasExternalDocs, externalDocs } from './mixins';

import type { v2 } from '../spec-types';

export class Tag extends SpecificationExtensionsModel<v2.TagObject> {
  name() {
    return this._json.name;
  }

  description() {
    return description(this);
  }

  hasDescription() {
    return hasDescription(this);
  }

  externalDocs() {
    return externalDocs(this);
  }

  hasExternalDocs() {
    return hasExternalDocs(this);
  }
}
