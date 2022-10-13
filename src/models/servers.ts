import { Collection } from './collection';
import type { ServerInterface } from './server';

export interface ServersInterface extends Collection<ServerInterface> {
  filterBySend(): ServerInterface[];
  filterByReceive(): ServerInterface[];
}

export class Servers extends Collection<ServerInterface> implements ServersInterface {
  override get(id: string): ServerInterface | undefined {
    return this.collections.find(server => server.id() === id);
  }

  filterBySend(): ServerInterface[] {
    return this.filterBy(server => server.operations().filterBySend().length > 0);
  }

  filterByReceive(): ServerInterface[] {
    return this.filterBy(server => server.operations().filterByReceive().length > 0);
  }
}