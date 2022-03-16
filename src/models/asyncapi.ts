import { InfoInterface } from "./info";
import { BaseModel } from "./base";

import { AsyncAPIDocumentV2 } from "./v2";
import { AsyncAPIDocumentV3 } from "./v3";

import { ExternalDocsMixinInterface, SpecificationExtensionsMixinInterface, TagsMixinInterface } from "./mixins";

export interface AsyncAPIDocumentInterface extends BaseModel, ExternalDocsMixinInterface, SpecificationExtensionsMixinInterface, TagsMixinInterface {
  version(): string;
  info(): InfoInterface;
}

export function newAsyncAPIDocument(json: Record<string, any>): AsyncAPIDocumentInterface {
  const version = json['asyncapi']; // Maybe this should be an arg.
  if (version == undefined || version == null || version == '') {
    throw new Error('Missing AsyncAPI version in document');
  }

  const major = version.split(".")[0];
  switch (major) {
    case '2':
      return new AsyncAPIDocumentV2(json);
    case '3':
      return new AsyncAPIDocumentV3(json);
    default:
      throw new Error(`Unsupported version: ${version}`);
  }
}
