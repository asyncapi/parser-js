import { AsyncAPIDocumentV2 } from "./v2";

import type { InfoInterface } from "./info";
import type { BaseModel } from "./base";
import type { ExtensionsMixinInterface } from "./mixins";
import type { ServersInterface } from "./servers";
import type { DetailedAsyncAPI } from "../types";

export interface AsyncAPIDocumentInterface extends BaseModel, ExtensionsMixinInterface {
  version(): string;
  info(): InfoInterface;
  servers(): ServersInterface;
}

export function newAsyncAPIDocument(asyncapi: DetailedAsyncAPI): AsyncAPIDocumentInterface {
  switch (asyncapi.semver.major) {
    case 2:
      return new AsyncAPIDocumentV2(asyncapi.parsed, { asyncapi, pointer: '/' });
    // case 3:
    //   return new AsyncAPIDocumentV3(asyncapi.parsed, { asyncapi, pointer: '/' }) as any;
    default:
      throw new Error(`Unsupported AsyncAPI version: ${asyncapi.semver.version}`);
  }
}
