import { BaseModel } from "../base";
import { Contact } from "./contact";
import { ExternalDocumentation } from "./external-docs";
import { License } from "./license";
import { Tags } from "./tags";
import { Tag } from "./tag";

import { hasDescription, description, extensions } from './mixins';

import type { ContactInterface } from "../contact";
import type { InfoInterface } from "../info";
import type { ExtensionsInterface } from "../extensions";
import type { ExternalDocumentationInterface } from "../external-docs";
import type { LicenseInterface } from "../license";
import type { TagsInterface } from "../tags";

import type { v2 } from "../../spec-types";

export class Info extends BaseModel<v2.InfoObject> implements InfoInterface {
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

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
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
      return this.createModel(ExternalDocumentation, this._meta.asyncapi.parsed.externalDocs as v2.ExternalDocumentationObject, { pointer: `/externalDocs` });
    }
    return;
  };

  tags(): TagsInterface {
    const tags = this._meta.asyncapi.parsed.tags || [];
    return new Tags(tags.map((tag: any, idx: number) => this.createModel(Tag, tag, { pointer: `/tags/${idx}` })));
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
