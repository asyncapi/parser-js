import type { BaseModel } from './base';
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';
import { SecurityRequirements } from './security-requirements';

export interface OperationTraitInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
  id(): string | undefined;
  hasId(): boolean;
  hasSummary(): boolean;
  summary(): string | undefined;
  security(): SecurityRequirements[];
}
