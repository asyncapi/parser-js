import { BaseModel } from '../base';
import { Contact } from './contact';
import { License } from './license';

import { hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';

import type { ContactInterface } from '../contact';
import type { InfoInterface } from '../info';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-documentation';
import type { LicenseInterface } from '../license';
import type { TagsInterface } from '../tags';

import type { v3 } from '../../spec-types';

export class Info extends BaseModel<v3.InfoObject> implements InfoInterface {
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
    return contact && this.createModel(Contact, contact, { pointer: this.jsonPath('contact') });
  }

  hasLicense(): boolean {
    return Object.keys(this._json.license || {}).length > 0;
  }

  license(): LicenseInterface | undefined {
    const license = this._json.license;
    return license && this.createModel(License, license, { pointer: this.jsonPath('license') });
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this);
  }

  externalDocs(): ExternalDocumentationInterface | undefined { 
    return externalDocs(this);
  }

  tags(): TagsInterface {
    return tags(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
