import type { BaseModel } from './base';
import type { DescriptionMixinInterface } from './mixins';

export interface OperationReplyAddressInterface extends BaseModel, DescriptionMixinInterface {
  id(): string | undefined;
  location(): string;
}
