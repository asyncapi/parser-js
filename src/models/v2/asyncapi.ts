import { BaseModel } from "../base";
import { Info } from "./info";

import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

import { AsyncAPIDocumentInterface, InfoInterface } from "../../models";
import { ServersInterface } from "models/servers";
import { Servers } from "./servers";
import { Server } from "./server";

export class AsyncAPIDocument
  extends Mixin(BaseModel, ExtensionsMixin)
  implements AsyncAPIDocumentInterface {

  version(): string {
    return this._json.asyncapi;
  }

  info(): InfoInterface {
    return this.createModel(Info, this._json.info, { pointer: '/info' });
  }

  servers(): ServersInterface {
    return new Servers(
      Object.entries(this._json.servers).map(([serverName, server]) => new Server(serverName, server as Record<string, any>))
    );
  }
}
