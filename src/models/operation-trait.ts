import type { BaseModel } from './base';
import type { ChannelsInterface } from './channels';
import type { OperationAction } from './operation';
import type { SecurityRequirements } from './security-requirements';
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';

export interface OperationTraitInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
  id(): string | undefined;
  hasId(): boolean;
  action(): OperationAction | undefined;
  isSend(): boolean;
  isReceive(): boolean;
  hasSummary(): boolean;
  summary(): string | undefined;
  security(): SecurityRequirements[];
  channels(): ChannelsInterface;
}
