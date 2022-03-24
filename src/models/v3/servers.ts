import { Collection } from '../collection';
import { ServerInterface } from '../server';
import { ServersInterface } from '../servers';

export class Servers extends Collection<ServerInterface> implements ServersInterface {
    override get(name: string): ServerInterface | undefined {
        return this.collections.find(server => server.name() === name);
    }

    override has(name: string): boolean {
        return this.collections.some(server => server.name() === name);
    }
}