import { BaseModel } from "../base";

import type { ExtensionInterface } from "../extension";

import type { v2 } from "../../spec-types";

export class Extension<T = any> extends BaseModel<v2.SpecificationExtension<T>, { name: string }> implements ExtensionInterface<T> {
  name(): string {
    return this._meta.name;
  }

  version(): string {
    return 'to implement';
  }

  value<V = T>(): V {
    return this._json as unknown as V;
  }
}
