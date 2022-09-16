import type { Collection } from './collection';
import type { ServerInterface } from './server';

export interface ServersInterface extends Collection<ServerInterface> {
  filterByInUse(): ServerInterface[];
  filterByNotInUse(): ServerInterface[];
  filterBySend(): ServerInterface[];
  filterByReceive(): ServerInterface[];
}
