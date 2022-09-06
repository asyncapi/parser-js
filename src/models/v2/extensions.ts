import { Collection } from '../collection';

import type { ExtensionsInterface } from '../extensions';
import type { ExtensionInterface } from '../extension';

export class Extensions extends Collection<ExtensionInterface> implements ExtensionsInterface {
  override get<T = any>(name: string): ExtensionInterface<T> | undefined {
    name = name.startsWith('x-') ? name : `x-${name}`;
    return this.collections.find(ext => ext.name() === name);
  }
}
