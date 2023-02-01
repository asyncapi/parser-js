import { Collection } from './collection';
import type { OperationReplyInterface } from './operation-reply';

export type OperationRepliesInterface = Collection<OperationReplyInterface>

export class OperationReplies extends Collection<OperationReplyInterface> implements OperationRepliesInterface {
  override get(id: string): OperationReplyInterface | undefined {
    return this.collections.find(reply => reply.id() === id);
  }
}
