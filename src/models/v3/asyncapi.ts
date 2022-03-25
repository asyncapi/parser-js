import { AsyncAPIDocumentInterface } from "../../models/asyncapi";
import { BaseModel } from "../base";
import { Info } from "./info";

import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';
import { ServersInterface } from "models/servers";
import { Servers } from "./servers";
import { Server } from "./server";

export class AsyncAPIDocument 
  extends Mixin(BaseModel, ExtensionsMixin) 
  implements AsyncAPIDocumentInterface {

  version(): string {
    return this.json("asyncapi");
  }

  info(): Info {
    return new Info(this.json("info"));
  }

  servers(): ServersInterface {
    return new Servers(
      Object.entries(this._json.servers).map(
        ([serverName, server]) => new Server(serverName, server as Record<string, any>)
      )
    )
  }
}
