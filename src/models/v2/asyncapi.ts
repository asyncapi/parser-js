import { BaseModel } from "../base";
import { Info } from "./info";

import { createArrayFromMap, Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

import { AsyncAPIDocumentInterface, InfoInterface } from "../../models";
import { ServersInterface } from "models/servers";
import { Servers } from "./servers";

export class AsyncAPIDocument 
  extends Mixin(BaseModel, ExtensionsMixin) 
  implements AsyncAPIDocumentInterface {

  version(): string {
    return this._json.asyncapi;
  }

  info(): InfoInterface {
    return new Info(this._json.info);
  }

  servers(): ServersInterface {
    return new Servers(createArrayFromMap(this._json.servers));
  }
}
