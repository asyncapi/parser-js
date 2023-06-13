import { Collection } from '../collection';

import type { OperationTraitsInterface } from '../operation-traits';
import type { OperationTraitInterface } from '../operation-trait';

export class OperationTraits extends Collection<OperationTraitInterface> implements OperationTraitsInterface {
  override get(id: string): OperationTraitInterface | undefined {
    return this.collections.find(trait => trait.id() === id);
  }
}
