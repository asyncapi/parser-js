import type { BaseModel } from './base';
import type { DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface } from './mixins';

export interface TagInterface 
  extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface {

  id(): string | undefined;
  name(): string;
}