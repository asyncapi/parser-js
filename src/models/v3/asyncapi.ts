import { AsyncAPIDocumentInterface } from "../../models/asyncapi";
import { BaseModel } from "../base";
import { Info } from "./info";

import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

export class AsyncAPIDocument 
  extends Mixin(BaseModel, ExtensionsMixin) 
  implements AsyncAPIDocumentInterface {
		
  version(): string {
    return this.json("asyncapi");
  }

  info(): Info {
    return new Info(this.json("info"));
  }
}
