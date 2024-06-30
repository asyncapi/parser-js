import { Base } from './base';
import { hasDescription, description, hasExternalDocs, externalDocs, extensionsMixins } from './mixins';

import type { v2 } from '../spec-types';

export class Tag extends Base<v2.TagObject> {
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
