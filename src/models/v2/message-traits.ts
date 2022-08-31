import { Collection } from '../collection';

import type { MessageTraitsInterface } from '../message-traits';
import type { MessageTraitInterface } from '../message-trait';

export class MessageTraits extends Collection<MessageTraitInterface> implements MessageTraitsInterface {
  protected override __get(id: string): MessageTraitInterface | undefined {
    return this.collections.find(trait => trait.id() === id);
  }
}
