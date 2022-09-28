import type { Collection } from './collection';

import type { MessageInterface } from './message';

import { FilterByUsageMixingInterface } from './mixins';

export interface MessagesInterface extends Collection<MessageInterface>, FilterByUsageMixingInterface<MessageInterface> {
  filterBySend(): MessageInterface[];
  filterByReceive(): MessageInterface[];
}