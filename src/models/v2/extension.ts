import { BaseModel } from "../base";

import type { ExtensionInterface } from "../extension";

import type { v2 } from "../../spec-types";

export class Extension extends BaseModel<v2.SpecificationExtension, { name: string }> implements ExtensionInterface {
  name(): string {
    return this._meta.name;
  }

  version(): string {
    return 'to implement';
  }

  value(): any {
    return this._json;
  }
}
