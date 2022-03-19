import { BaseModel } from "../base";

import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

import type { ContactInterface } from "../../models/contact";

export class Contact extends Mixin(BaseModel, ExtensionsMixin) implements ContactInterface {
  hasName(): boolean {
    return !!typeof this._json.name;
  }

  name(): string | undefined {
    return this._json.name;
  }

  hasUrl(): boolean {
    return !!typeof this._json.url;
  }

  url(): string | undefined {
    return this._json.url;
  }

  hasEmail(): boolean {
    return !!typeof this._json.email;
  }

  email(): string | undefined {
    return this._json.email;
  }
}