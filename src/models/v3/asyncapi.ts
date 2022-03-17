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

  servers(): Record<string, ServerInterface> {
    return createMapOfTypes(this.json('servers'), Server);
  }

  hasServers(): boolean {
    return !!this.json('servers');
  }

  serverNames(): string[] {
    if(!this.json('servers')) return [];
    return Object.keys(this.json('servers'));
  }

  server(name: string): ServerInterface {
    return getMapValueOfType(this.json('servers'), name, Server);
  }
}
