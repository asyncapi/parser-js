import { Collection } from './collection';
import type { ServerVariableInterface } from './server-variable';

export type ServerVariablesInterface = Collection<ServerVariableInterface>;

export class ServerVariables extends Collection<ServerVariableInterface> implements ServerVariablesInterface {
  override get(id: string): ServerVariableInterface | undefined {
    return this.collections.find(variable => variable.id() === id);
  }
}
