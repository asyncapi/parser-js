import { Collection } from '../collection';

import type { ChannelTraitsInterface } from '../channel-traits';
import type { ChannelTraitInterface } from '../channel-trait';

export class ChannelTraits extends Collection<ChannelTraitInterface> implements ChannelTraitsInterface {
  override get(id: string): ChannelTraitInterface | undefined {
    return this.collections.find(trait => trait.id() === id);
  }
}
