import { Collection } from '../collection';

import type { ServerVariablesInterface } from '../server-variables';
import type { ServerVariableInterface } from '../server-variable';

export class ServerVariables extends Collection<ServerVariableInterface> implements ServerVariablesInterface {
  override get(id: string): ServerVariableInterface | undefined {
    return this.collections.find(serverVariable => serverVariable.id() === id);
  }

  override has(id: string): boolean {
    return this.collections.some(serverVariable => serverVariable.id() === id);
  }
}
