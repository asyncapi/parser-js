import { AsyncAPIDocumentV2 } from "./v2";

import type { BaseModel } from "./base";
import type { InfoInterface } from "./info";
import type { ChannelsInterface } from "./channels";
import type { ComponentsInterface } from "./components";
import type { MessagesInterface } from "./messages";
import type { ExtensionsMixinInterface } from "./mixins";
import type { OperationsInterface } from "./operations";
import type { SchemasInterface } from "./schemas";
import type { SecuritySchemesInterface } from "./security-schemes";
import type { ServersInterface } from "./servers";
import type { DetailedAsyncAPI } from "../types";

import type { v2 } from "../interfaces";

export interface AsyncAPIDocumentInterface extends BaseModel<v2.AsyncAPIObject>, ExtensionsMixinInterface {
  version(): string;
  defaultContentType(): string | undefined;
  hasDefaultContentType(): boolean;
  info(): InfoInterface;
  servers(): ServersInterface;
  channels(): ChannelsInterface;
  operations(): OperationsInterface;
  messages(): MessagesInterface;
  schemas(): SchemasInterface;
  securitySchemes(): SecuritySchemesInterface;
  components(): ComponentsInterface;
}

export function newAsyncAPIDocument(asyncapi: DetailedAsyncAPI): AsyncAPIDocumentInterface {
  switch (asyncapi.semver.major) {
    case 2:
      return new AsyncAPIDocumentV2(asyncapi.parsed, { asyncapi, pointer: '/' });
    // case 3:
    //   return new AsyncAPIDocumentV3(asyncapi.parsed, { asyncapi, pointer: '/' });
    default:
      throw new Error(`Unsupported AsyncAPI version: ${asyncapi.semver.version}`);
  }
}
