import { Collection } from '../collection';

import type { ChannelsInterface } from '../channels';
import type { ChannelInterface } from '../channel';

export class Channels extends Collection<ChannelInterface> implements ChannelsInterface {
  override get(id: string): ChannelInterface | undefined {
    return this.collections.find(channel => channel.id() === id);
  }

  override has(id: string): boolean {
    return this.collections.some(channel => channel.id() === id);
  }
}
