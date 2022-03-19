import { BaseModel } from "../base";

import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

import type { LicenseInterface } from "../../models/license";

export class License extends Mixin(BaseModel, ExtensionsMixin) implements LicenseInterface {
  name(): string {
    return this._json.name;
  }

  hasUrl(): boolean {
    return !!typeof this._json.url;
  }

  url(): string | undefined {
    return this._json.url;
  }
}