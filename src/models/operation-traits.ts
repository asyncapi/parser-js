import { Collection } from './collection';
import type { OperationTraitInterface } from './operation-trait';

export type OperationTraitsInterface = Collection<OperationTraitInterface>

export class OperationTraits extends Collection<OperationTraitInterface> implements OperationTraitsInterface {
  override get(id: string): OperationTraitInterface | undefined {
    return this.collections.find(trait => trait.id() === id);
  }
}
