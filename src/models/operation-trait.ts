import type { BaseModel } from './base';
import type { SecurityRequirements } from './security-requirements';
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';

export interface OperationTraitInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
  hasId(): boolean;
  id(): string | undefined;
  hasSummary(): boolean;
  summary(): string | undefined;
  security(): SecurityRequirements[];
}
