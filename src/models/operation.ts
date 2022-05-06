import type { BaseModel } from "./base";
import type { MessagesInterface } from "./messages";
import type { OperationTraitsInterface } from "./operation-traits";
import type { OperationTraitInterface } from "./operation-trait";

export type OperationAction = 'send' | 'receive' | 'publish' | 'subscribe';

export interface OperationInterface extends BaseModel, OperationTraitInterface {
  messages(): MessagesInterface;
  traits(): OperationTraitsInterface;
}
