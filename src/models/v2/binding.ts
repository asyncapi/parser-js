import { BaseModel } from "../base";

import { extensions } from "./mixins";

import type { BindingInterface } from "../binding";
import type { ExtensionsInterface } from "../extensions";

import type { v2 } from "../../spec-types";

export class Binding<T extends Record<string, any> = Record<string, any>> extends BaseModel<v2.Binding & T, { protocol: string }> implements BindingInterface<T> {
  protocol(): string {
    return this._meta.protocol;
  }

  version(): string {
    return this._json.bindingVersion || 'latest';
  }

  value<V = T>(): V {
    const value = { ...this._json };
    delete (value as any).bindingVersion;
    return value as unknown as V;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
