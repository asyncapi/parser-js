import { Collection } from '../collection';

import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';

export class Operations extends Collection<OperationInterface> implements OperationsInterface {
  override get(id: string): OperationInterface | undefined {
    return this.collections.find(operation => operation.id() === id);
  }

  override has(id: string): boolean {
    return this.collections.some(operation => operation.id() === id);
  }

  filterBySend(): OperationInterface[] {
    return this.filterBy(function (operation: OperationInterface): boolean {
      return operation.isSend();
    })
  }

  filterByReceive(): OperationInterface[] {
    return this.filterBy(function (operation: OperationInterface): boolean {
      return operation.isReceive();
    });
  }
}
