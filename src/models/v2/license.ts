import { BaseModel } from "../base";

import { extensions } from './mixins';

import type { ExtensionsInterface } from "../extensions";
import type { LicenseInterface } from "../license";

import type { v2 } from "../../spec-types";

export class License extends BaseModel<v2.LicenseObject> implements LicenseInterface {
  name(): string {
    return this._json.name;
  }

  hasUrl(): boolean {
    return !!this._json.url;
  }

  url(): string | undefined {
    return this._json.url;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
