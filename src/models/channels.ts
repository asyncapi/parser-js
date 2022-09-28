import type { Collection } from './collection';
import type { ChannelInterface } from './channel';
import { FilterByUsageMixingInterface } from './mixins';

export interface ChannelsInterface extends Collection<ChannelInterface>, FilterByUsageMixingInterface<ChannelInterface> {
  filterByInUse(): ChannelInterface[];
  filterByNotInUse(): ChannelInterface[];
  filterBySend(): ChannelInterface[];
  filterByReceive(): ChannelInterface[];
}