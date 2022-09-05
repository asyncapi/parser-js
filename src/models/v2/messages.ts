import { Collection } from '../collection';

import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';

export class Messages extends Collection<MessageInterface> implements MessagesInterface {
  override get(id: string): MessageInterface | undefined {
    return this.collections.find(message => message.id() === id);
  }

  override has(id: string): boolean {
    return this.collections.some(message => message.id() === id);
  }

  filterBySend(): MessageInterface[] {
      return this.filterBy(function (messages: MessageInterface): boolean {
        return messages.operations().filterBySend().length > 0;
      })
  }

  filterByReceive(): MessageInterface[] {
    return this.filterBy(function (messages: MessageInterface): boolean {
      return messages.operations().filterByReceive().length > 0;
    });
  }
}
