import { Collection } from '../collection';

import type { ChannelParametersInterface } from '../channel-parameters';
import type { ChannelParameterInterface } from '../channel-parameter';

export class ChannelParameters extends Collection<ChannelParameterInterface> implements ChannelParametersInterface {
  protected override __get(id: string): ChannelParameterInterface | undefined {
    return this.collections.find(parameter => parameter.id() === id);
  }
}
