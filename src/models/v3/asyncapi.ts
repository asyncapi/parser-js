import { AsyncAPIDocumentInterface } from "../../models/asyncapi";
import { BaseModel } from "../base";
import { Info } from "./info";

import { Mixin, ExternalDocsMixin, SpecificationExtensionsMixin, TagsMixin } from '../mixins';
import { ServerInterface } from "../server";
import { createMapOfTypes, getMapValueOfType } from "../utils";
import { Server } from "./server";

export class AsyncAPIDocument
  extends Mixin(BaseModel, ExternalDocsMixin, SpecificationExtensionsMixin, TagsMixin)
  implements AsyncAPIDocumentInterface {

  version(): string {
    return this.json("asyncapi");
  }

  info(): Info {
    return new Info(this.json("info"));
  }

  servers(): Record<string, ServerInterface>;
  servers(name: string): ServerInterface;
  servers(name?: any): ServerInterface | Record<string, ServerInterface> {
    if (name) return getMapValueOfType(this.json('servers'), name, Server);
    return createMapOfTypes(this.json('servers'), Server);
  }

  hasServer(name: string): boolean {
    return Object.keys(this.json('servers')).includes(name) ? true : false;
  }
}
