import { Collection } from '../collection';

import type { ChannelsInterface } from '../channels';
import type { ChannelInterface } from '../channel';

import { filterByInUse, filterByNotInUse } from './mixins';

export class Channels extends Collection<ChannelInterface> implements ChannelsInterface {
  override get(id: string): ChannelInterface | undefined {
    return this.collections.find(channel => channel.id() === id);
  }

  filterBySend(): ChannelInterface[] {
    return this.filterBy(channel => channel.operations().filterBySend().length > 0);
  }

  filterByReceive(): ChannelInterface[] {
    return this.filterBy(channel => channel.operations().filterByReceive().length > 0);
  }

  filterByInUse(): ChannelInterface[] {
    return filterByInUse(this);
  }

  filterByNotInUse(): ChannelInterface[] {
    return filterByNotInUse(this);
  }
}
