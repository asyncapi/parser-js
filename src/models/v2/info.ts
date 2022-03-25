import { BaseModel } from "../base";
import { Contact } from "./contact";
import { License } from "./license";

import { Mixin } from '../utils';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';
import { ExternalDocumentation } from './mixins/external-docs';
import { Tags, Tag } from './mixins/tags';

import type { InfoInterface } from "../../models/info";
import type { ExternalDocumentationInterface } from "../../models/external-docs";
import type { TagsInterface } from "../../models/tags";

export class Info 
  extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin) 
  implements InfoInterface {

  title(): string {
    return this._json.title;
  }

  version(): string {
    return this._json.version;
  }

  id(): string | undefined {
    return this._meta.asyncapi.parsed.id as string;
  }

  hasId(): boolean {
    return !!this._meta.asyncapi.parsed.id;
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
    return contact && this.createModel(Contact, contact, { pointer: '/info/contact' });
  }

  hasLicense(): boolean {
    return Object.keys(this._json.license || {}).length > 0;
  }

  license(): License | undefined {
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
