import { Collection } from './collection';
import type { OperationReplyAddressInterface } from './operation-reply-address';

export type OperationReplyAddressesInterface = Collection<OperationReplyAddressInterface>

export class OperationReplyAddresses extends Collection<OperationReplyAddressInterface> implements OperationReplyAddressesInterface {
  override get(id: string): OperationReplyAddressInterface | undefined {
    return this.collections.find(reply => reply.id() === id);
  }
}
