import { AsyncAPIDocumentInterface } from "../../models";
import { BaseModel } from "../base";
import { Info } from "./info";

import { Mixin, ExternalDocsMixin, SpecificationExtensionsMixin, TagsMixin } from '../mixins';
import { createMapOfTypes, getMapValueOfType } from "../utils";

export class AsyncAPIDocument
  extends Mixin(BaseModel, ExternalDocsMixin, SpecificationExtensionsMixin, TagsMixin)
  implements AsyncAPIDocumentInterface {

  version(): string {
    return this.json("asyncapi");
  }

  info(): Info {
    return new Info(this.json("info"));
  }
}
