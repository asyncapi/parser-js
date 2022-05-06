import { BaseModel } from "../base";
import { Contact } from "./contact";
import { License } from "./license";

import { Mixin } from '../utils';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';
import { ExternalDocumentation } from './mixins/external-docs';
import { Tags, Tag } from './mixins/tags';

import type { ContactInterface } from "../contact";
import type { InfoInterface } from "../info";
import type { ExternalDocumentationInterface } from "../external-docs";
import type { LicenseInterface } from "../license";
import type { TagsInterface } from "../tags";

export class Info extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin) implements InfoInterface {
  title(): string {
    return this._json.title;
  }

  version(): string {
    return this._json.version;
  }

  hasId(): boolean {
    return !!this._meta.asyncapi.parsed.id;
  }

  id(): string | undefined {
    return this._meta.asyncapi.parsed.id;
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

  contact(): ContactInterface | undefined {
    const contact = this._json.contact;
    return contact && this.createModel(Contact, contact, { pointer: '/info/contact' });
  }

  hasLicense(): boolean {
    return Object.keys(this._json.license || {}).length > 0;
  }

  license(): LicenseInterface | undefined {
    const license = this._json.license;
    return license && this.createModel(License, license, { pointer: `/info/license` });
  }

  hasExternalDocs(): boolean {
    return Object.keys(this._meta.asyncapi.parsed.externalDocs || {}).length > 0;
  };

  externalDocs(): ExternalDocumentationInterface | undefined { 
    if (this.hasExternalDocs()) {
      return this.createModel(ExternalDocumentation, this._meta.asyncapi.parsed.externalDocs, { pointer: `/externalDocs` });
    }
    return;
  };

  tags(): TagsInterface {
    const tags = this._meta.asyncapi.parsed.tags || [];
    return new Tags(tags.map((tag: any, idx: number) => this.createModel(Tag, tag, { pointer: `/tags/${idx}` })));
  }
}
