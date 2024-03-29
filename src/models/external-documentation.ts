import type { BaseModel } from './base';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';

export interface ExternalDocumentationInterface 
  extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {

  id(): string | undefined;
  url(): string;
}