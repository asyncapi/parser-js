import { Collection } from './collection';
import type { ExtensionInterface } from './extension';

export type ExtensionsInterface = Collection<ExtensionInterface>

export class Extensions extends Collection<ExtensionInterface> implements ExtensionsInterface {
  override get<T = any>(id: string): ExtensionInterface<T> | undefined {
    id = id.startsWith('x-') ? id : `x-${id}`;
    return this.collections.find(ext => ext.id() === id);
  }
}