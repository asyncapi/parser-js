import { BaseModel } from "../base";

import { extensions } from './mixins';

import type { ContactInterface } from "../contact";
import type { ExtensionsInterface } from "../extensions";

import type { v2 } from "../../interfaces";

export class Contact extends BaseModel<v2.ContactObject> implements ContactInterface {
  hasName(): boolean {
    return !!this._json.name;
  }

  name(): string | undefined {
    return this._json.name;
  }

  hasUrl(): boolean {
    return !!this._json.url;
  }

  url(): string | undefined {
    return this._json.url;
  }

  hasEmail(): boolean {
    return !!this._json.email;
  }

  email(): string | undefined {
    return this._json.email;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}