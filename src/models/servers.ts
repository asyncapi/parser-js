import type { Collection } from './collection';
import { FilterByUsageMixingInterface } from './mixins';
import type { ServerInterface } from './server';

export interface ServersInterface extends Collection<ServerInterface>, FilterByUsageMixingInterface<ServerInterface> {
  filterByInUse(): ServerInterface[];
  filterByNotInUse(): ServerInterface[];
  filterBySend(): ServerInterface[];
  filterByReceive(): ServerInterface[];
}
