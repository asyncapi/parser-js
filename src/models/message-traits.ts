import { Collection } from './collection';
import type { MessageTraitInterface } from './message-trait';

export type MessageTraitsInterface = Collection<MessageTraitInterface>

export class MessageTraits extends Collection<MessageTraitInterface> implements MessageTraitsInterface {
  override get(id: string): MessageTraitInterface | undefined {
    return this.collections.find(trait => trait.id() === id);
  }
}