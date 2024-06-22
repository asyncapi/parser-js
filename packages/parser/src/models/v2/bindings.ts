import { Collection } from '../collection';
import { Extensions } from './extensions';
import { Extension } from './extension';

import { createModel } from '../utils';
import { EXTENSION_REGEX } from '../../constants';

import type { BindingsInterface } from '../bindings';
import type { BindingInterface } from '../binding';
import type { ExtensionsInterface } from '../extensions';
import type { ExtensionInterface } from '../extension';

import type  { v2 } from '../../spec-types';

export class Bindings extends Collection<BindingInterface> implements BindingsInterface {
  override get<T extends Record<string, any> = Record<string, any>>(name: string): BindingInterface<T> | undefined {
    return this.collections.find(binding => binding.protocol() === name);
  }

  extensions(): ExtensionsInterface {
    const extensions: ExtensionInterface[] = [];
    Object.entries(this._meta.originalData as v2.SpecificationExtensions || {}).forEach(([id, value]) => {
      if (EXTENSION_REGEX.test(id)) {
        extensions.push(
          createModel(Extension, value, { id, pointer: `${this._meta.pointer}/${id}`, asyncapi: this._meta.asyncapi }) as Extension
        );
      }
    });
    return new Extensions(extensions);
  }
}
