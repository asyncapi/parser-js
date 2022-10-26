import { Collection } from './collection';

import type { OperationInterface } from './operation';

export interface OperationsInterface extends Collection<OperationInterface> {
  filterBySend(): OperationInterface[];
  filterByReceive(): OperationInterface[];
}

export class Operations extends Collection<OperationInterface> implements OperationsInterface {
  override get(id: string): OperationInterface | undefined {
    return this.collections.find(operation => operation.id() === id);
  }

  filterBySend(): OperationInterface[] {
    return this.filterBy(operation => operation.isSend());
  }

  filterByReceive(): OperationInterface[] {
    return this.filterBy(operation => operation.isReceive());
  }
}
