import { Collection } from './collection';
import type { ChannelInterface } from './channel';

export interface ChannelsInterface extends Collection<ChannelInterface> {
  filterBySend(): ChannelInterface[];
  filterByReceive(): ChannelInterface[];
}

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
}
