import { AsyncAPIDocumentV2 } from "./v2";
import { AsyncAPIDocumentV3 } from "./v3";

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

export function newAsyncAPIDocument(document: DetailedAsyncAPI): AsyncAPIDocumentInterface {
  const majorVersion = document.semver.major;
  switch (majorVersion) {
    case 2:
      return new AsyncAPIDocumentV2(document.parsed, { parent: null, asyncapi: document, pointer: '/' });
    case 3:
      return new AsyncAPIDocumentV3(document.parsed, { parent: null, asyncapi: document, pointer: '/' });
    default:
      throw new Error(`Unsupported AsyncAPI version: ${majorVersion}`);
  }
}
