import { Collection } from '../collection';

import type { ChannelParametersInterface } from '../channel-parameters';
import type { ChannelParameterInterface } from '../channel-parameter';

export class ChannelParameters extends Collection<ChannelParameterInterface> implements ChannelParametersInterface {
  override get(id: string): ChannelParameterInterface | undefined {
    return this.collections.find(parameter => parameter.id() === id);
  }

  override has(id: string): boolean {
    return this.collections.some(parameter => parameter.id() === id);
  }
}
