import { BaseModel } from "../base";
import { Contact } from "./contact";
import { License } from "./license";

import { Mixin } from '../utils';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';
import { ExternalDocumentationMixin } from './mixins/external-docs';
import { TagsMixin } from './mixins/tags';

import type { InfoInterface } from "../../models/info";

export class Info 
  extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin, ExternalDocumentationMixin, TagsMixin) 
  implements InfoInterface {

  title(): string {
    return this._json.title;
  }

  version(): string {
    return this._json.version;
  }

  // TODO: Implement it
  id(): string | undefined {
    return;
  }

  // TODO: Implement it
  hasId(): boolean {
    return true;
  }

  hasTermsOfService(): boolean {
    return !!this._json.termsOfService;
  }

  termsOfService(): string | undefined {
    return this._json.termsOfService;
  }

  hasContact(): boolean {
    return Object.keys(this._json.contact || {}).length > 0;
  }

  contact(): Contact | undefined {
    const contact = this._json.contact;
    return contact && new Contact(contact);
  }

  hasLicense(): boolean {
    return Object.keys(this._json.license || {}).length > 0;
  }

  license(): License | undefined {
    const license = this._json.license;
    return license &&  new License(license);
  }
}