import { BaseModel } from "../base";
import { Info } from "./info";

import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

import { AsyncAPIDocumentInterface, InfoInterface } from "../../models";

export class AsyncAPIDocument 
  extends Mixin(BaseModel, ExtensionsMixin) 
  implements AsyncAPIDocumentInterface {

  version(): string {
    return this._json.asyncapi;
  }

  info(): InfoInterface {
    return new Info(this._json.info);
  }
}
