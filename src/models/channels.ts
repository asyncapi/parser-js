import type { Collection } from './collection';
import type { ChannelInterface } from './channel';

export interface ChannelsInterface extends Collection<ChannelInterface> {
  filterByInUse(): ChannelInterface[];
  filterByNotInUse(): ChannelInterface[];
  filterBySend(): ChannelInterface[];
  filterByReceive(): ChannelInterface[];
}