import type { BaseModel } from "./base";
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';
import type { OperationAction } from "./operation";
import type { SecuritySchemeInterface } from "./security-scheme";
import { SecurityRequirements } from "./v2/security-requirements";

export interface OperationTraitInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
  id(): string;
  action(): OperationAction;
  hasOperationId(): boolean;
  operationId(): string | undefined;
  hasSummary(): boolean;
  summary(): string | undefined;
  security(): SecurityRequirements[];
}
