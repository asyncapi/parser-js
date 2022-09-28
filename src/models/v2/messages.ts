import { Collection } from '../collection';

import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';

import { filterByInUse, filterByNotInUse } from './mixins';

export class Messages extends Collection<MessageInterface> implements MessagesInterface {
  override get(name: string): MessageInterface | undefined {
    return this.collections.find(message => message.id() === name);
  }

  filterBySend(): MessageInterface[] {
    return this.filterBy(message => message.operations().filterBySend().length > 0);
  }

  filterByReceive(): MessageInterface[] {
    return this.filterBy(message => message.operations().filterByReceive().length > 0);
  }

  filterByInUse(): MessageInterface[] {
    return filterByInUse(this);
  }

  filterByNotInUse(): MessageInterface[] {
    return filterByNotInUse(this);
  }
}
