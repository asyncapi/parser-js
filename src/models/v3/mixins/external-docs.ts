import { BaseModel } from "../../base";

import { Mixin } from '../../utils';
import { DescriptionMixin } from './description';
import { ExtensionsMixin } from './extensions';

import type { ExternalDocumentationInterface } from '../../external-docs';
import type { ExternalDocumentationMixinInterface } from "../../mixins";

export class ExternalDocumentation 
  extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin) 
  implements ExternalDocumentationInterface {

  url(): string {
    return this._json.url;
  }
}

export abstract class ExternalDocumentationMixin extends BaseModel implements ExternalDocumentationMixinInterface {
  hasExternalDocs(): boolean {
    return Object.keys(this._json.externalDocs || {}).length > 0;
  };

  externalDocs(): ExternalDocumentationInterface | undefined { 
    if (this.hasExternalDocs()) {
      return new ExternalDocumentation(this._json.externalDocs);
    }
    return;
  };
}