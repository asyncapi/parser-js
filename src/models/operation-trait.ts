import type { BaseModel } from './base';
import type { SecurityRequirements } from './security-requirements';
import type { CoreMixinInterface } from './mixins';

export interface OperationTraitInterface extends BaseModel, CoreMixinInterface {
  hasId(): boolean;
  id(): string | undefined;
  security(): SecurityRequirements[];
}
