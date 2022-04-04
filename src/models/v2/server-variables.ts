import { ServerVariablesInterface } from '../server-variables';
import { Collection } from '../collection';
import { ServerVariableInterface } from '../server-variable';

export class ServerVariables extends Collection<ServerVariableInterface> implements ServerVariablesInterface {
    get(id: string): ServerVariableInterface | undefined {
        return this.collections.find(serverVariable => serverVariable.id() === id);
    }

    has(id: string): boolean {
        return this.collections.some(serverVariable => serverVariable.id() === id);
    }

}

