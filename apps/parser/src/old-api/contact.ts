import { SpecificationExtensionsModel } from './mixins';

import type { v2 } from '../spec-types';

export class Contact extends SpecificationExtensionsModel<v2.ContactObject> {
  name() {
    return this._json.name;
  }
  
  url() {
    return this._json.url;
  }
  
  email() {
    return this._json.email;
  }
}