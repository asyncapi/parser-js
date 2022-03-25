import { Collection } from '../collection';
import { ServerInterface } from '../server';
import { ServersInterface } from '../servers';

export class Servers extends Collection<ServerInterface> implements ServersInterface {
    override get(id: string): ServerInterface | undefined {
        return this.collections.find(server => server.id() === id);
    }

    override has(id: string): boolean {
        return this.collections.some(server => server.id() === id);
    }
}