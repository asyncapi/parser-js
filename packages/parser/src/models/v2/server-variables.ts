import { Collection } from '../collection';

import type { ServerVariablesInterface } from '../server-variables';
import type { ServerVariableInterface } from '../server-variable';

export class ServerVariables extends Collection<ServerVariableInterface> implements ServerVariablesInterface {
  override get(id: string): ServerVariableInterface | undefined {
    return this.collections.find(variable => variable.id() === id);
  }
}
