import { Collection } from '../collection';

import type { ExtensionsInterface } from '../extensions';
import type { ExtensionInterface } from '../extension';

export class Extensions extends Collection<ExtensionInterface> implements ExtensionsInterface {
  override get<T = any>(id: string): ExtensionInterface<T> | undefined {
    const extId = id.startsWith('x-') ? id : `x-${id}`;
    return this.collections.find(ext => ext.id() === extId);
  }
}
