import { Collection } from '../collection';

import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';

export class Messages extends Collection<MessageInterface> implements MessagesInterface {
  protected override __get(name: string): MessageInterface | undefined {
    return this.collections.find(message => message.id() === name);
  }

  filterBySend(): MessageInterface[] {
    return this.filterBy(message => message.operations().filterBySend().length > 0);
  }

  filterByReceive(): MessageInterface[] {
    return this.filterBy(message => message.operations().filterByReceive().length > 0);
  }
}
