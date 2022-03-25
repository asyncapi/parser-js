import { Collection } from '../../collection';
import { BaseModel } from "../../base";

import type { ModelMetadata } from "../../base";
import type { ExtensionsMixinInterface } from "../../mixins";
import type { ExtensionsInterface } from "../../extensions";
import type { ExtensionInterface } from "../../extension";

import { EXTENSION_REGEX } from '../../../constants';

export class Extension extends BaseModel implements ExtensionInterface {
  constructor(
    private readonly _id: string,
    _json: Record<string, any>,
    _meta: ModelMetadata = {} as any,
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this._id;
  }

  version(): string {
    return 'to implement';
  }

  value(): any {
    return this._json;
  }
}

export class Extensions extends Collection<ExtensionInterface> implements ExtensionsInterface {
  override get(name: string): ExtensionInterface | undefined {
    return this.collections.find(ext => ext.id() === name);
  };

  override has(name: string): boolean {
    return this.collections.some(ext => ext.id() === name);
  };
}

export abstract class ExtensionsMixin extends BaseModel implements ExtensionsMixinInterface {
  extensions(): ExtensionsInterface {
    const extensions: Extension[] = [];
    Object.entries(this._json).forEach(([key, value]) => {
      if (EXTENSION_REGEX.test(key)) {
        extensions.push(
          this.createModel(Extension, value, { id: key, pointer: `${this._meta.pointer}/${key}` })
        );
      }
    });
    return new Extensions(extensions);
  };
}