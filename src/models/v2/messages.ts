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
}
