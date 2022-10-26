import type { BaseModel } from './base';
import type { MessagesInterface } from './messages';
import type { OperationTraitsInterface } from './operation-traits';
import type { OperationTraitInterface } from './operation-trait';
import type { ServersInterface } from './servers';

export type OperationAction = 'send' | 'receive' | 'publish' | 'subscribe';

export interface OperationInterface extends BaseModel, OperationTraitInterface {
  action(): OperationAction;
  servers(): ServersInterface;
  messages(): MessagesInterface;
  traits(): OperationTraitsInterface;
}
