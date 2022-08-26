import { BaseModel } from "../base";

import { extensions } from "./mixins";

import type { BindingInterface } from "../binding";
import type { ExtensionsInterface } from "../extensions";

import type { v2 } from "../../interfaces";

export class Binding extends BaseModel<v2.Binding, { protocol: string }> implements BindingInterface {
  protocol(): string {
    return this._meta.protocol;
  }

  version(): string {
    return this._json.bindingVersion;
  }

  value<T extends Record<string, any> = Record<string, any>>(): T {
    const value = { ...this._json };
    delete (value as any).bindingVersion;
    return value as unknown as T;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
