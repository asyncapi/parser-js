import { SpecificationExtensionsModel } from './mixins';

import type { v2 } from '../spec-types';

export class License extends SpecificationExtensionsModel<v2.LicenseObject> {
  name() {
    return this._json.name;
  }
  
  url() {
    return this._json.url;
  }
}