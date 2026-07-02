import type { BaseModel } from './base';
import type { ChannelParametersInterface } from './channel-parameters';
import type { CoreMixinInterface } from './mixins';
import type { ServersInterface } from './servers';

export interface ChannelTraitInterface extends BaseModel, CoreMixinInterface {
  id(): string;
  servers(): ServersInterface;
  parameters(): ChannelParametersInterface;
}
