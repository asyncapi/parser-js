import type { BaseModel } from "./base";
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';
import type { OperationKind } from "./operation";
import type { SecurityRequirementsInterface } from "./security-requirements";

export interface OperationTraitInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
  id(): string;
  kind(): OperationKind;
  hasOperationId(): boolean;
  operationId(): string | undefined;
  hasSummary(): boolean;
  summary(): string | undefined;
  security(): SecurityRequirementsInterface;
}
