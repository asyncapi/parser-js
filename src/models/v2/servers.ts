import { Collection } from '../collection';
import { ServerInterface } from '../server';
import { ServersInterface } from '../servers';

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
