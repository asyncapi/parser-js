import { Collection } from './collection';
import type { ChannelParameterInterface } from './channel-parameter';

export type ChannelParametersInterface = Collection<ChannelParameterInterface>;

export class ChannelParameters extends Collection<ChannelParameterInterface> implements ChannelParametersInterface {
  override get(id: string): ChannelParameterInterface | undefined {
    return this.collections.find(parameter => parameter.id() === id);
  }
}