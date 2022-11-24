import type { BaseModel } from './base';
import type { ChannelParametersInterface } from './channel-parameters';
import type { MessagesInterface } from './messages';
import type { CoreMixinInterface } from './mixins';
import type { OperationsInterface } from './operations';
import type { ServersInterface } from './servers';

export interface ChannelInterface extends BaseModel, CoreMixinInterface {
  id(): string;
  address(): string | null | undefined;
  servers(): ServersInterface;
  operations(): OperationsInterface;
  messages(): MessagesInterface;
  parameters(): ChannelParametersInterface;
}
