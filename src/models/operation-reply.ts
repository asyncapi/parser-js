import type { BaseModel } from './base';
import type { ChannelInterface } from './channel';
import type { OperationReplyAddressInterface } from './operation-reply-address';

export interface OperationReplyInterface extends BaseModel {
  id(): string | undefined;
  hasAddress(): boolean;
  address(): OperationReplyAddressInterface | undefined;
  hasChannel(): boolean;
  channel(): ChannelInterface | undefined;
}
