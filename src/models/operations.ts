import type { Collection } from './collection';

import type { OperationInterface } from './operation';

import { FilterByUsageMixingInterface } from './mixins';

export interface OperationsInterface extends Collection<OperationInterface>, FilterByUsageMixingInterface<OperationInterface> {
  filterBySend(): OperationInterface[];
  filterByReceive(): OperationInterface[];
}
