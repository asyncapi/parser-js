import type { BaseModel } from './base';
import type { OperationTraitsInterface } from './operation-traits';
import type { OperationTraitInterface } from './operation-trait';
import type { OperationReplyInterface } from './operation-reply';
import type { ChannelsInterface } from './channels';
import type { ServersInterface } from './servers';
import type { MessagesInterface } from './messages';

export type OperationAction = 'send' | 'receive' | 'publish' | 'subscribe';

export interface OperationInterface extends BaseModel, OperationTraitInterface {
  action(): OperationAction;
  isSend(): boolean;
  isReceive(): boolean;
  servers(): ServersInterface;
  channels(): ChannelsInterface
  messages(): MessagesInterface;
  reply(): OperationReplyInterface | undefined;
  traits(): OperationTraitsInterface;
  hasReply(): boolean;
}
