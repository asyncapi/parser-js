import { Base } from './base';
import { description, hasDescription, extensionsMixins } from './mixins';

import type { v2 } from '../spec-types';

export class ExternalDocs extends Base<v2.ExternalDocumentationObject> {
  url() {
    return this._json.url;
  }

  hasDescription() {
    return hasDescription(this);
  }

  description() {
    return description(this);
  }

  hasExtensions() {
    return extensionsMixins.hasExtensions(this);
  }

  extensions(): v2.SpecificationExtensions {
    return extensionsMixins.extensions(this);
  }

  extensionKeys() {
    return extensionsMixins.extensionKeys(this);
  }

  extKeys() {
    return extensionsMixins.extKeys(this);
  }

  hasExtension(extension: string) {
    return extensionsMixins.hasExtension(this, extension);
  }

  extension(extension: string): v2.SpecificationExtension {
    return extensionsMixins.extension(this, extension);
  }

  hasExt(extension: string) {
    return extensionsMixins.hasExt(this, extension);
  }

  ext(extension: string) {
    return extensionsMixins.ext(this, extension);
  }
}