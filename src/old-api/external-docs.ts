import { SpecificationExtensionsModel, description, hasDescription } from './mixins';

import type { v2 } from '../spec-types';

export class ExternalDocs extends SpecificationExtensionsModel<v2.ExternalDocumentationObject> {
  url() {
    return this._json.url;
  }

  hasDescription() {
    return hasDescription(this);
  }

  description() {
    return description(this);
  }
}