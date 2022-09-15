import { AsyncAPIDocumentV2, AsyncAPIDocumentV3 } from './models';
import { unstringify } from './stringify';
import { createDetailedAsyncAPI } from './utils';

import { 
  xParserSpecParsed,
  xParserSpecStringified,
} from './constants';

import type { AsyncAPIDocumentInterface } from './models';
import type { DetailedAsyncAPI } from './types';

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

export function toAsyncAPIDocument(maybeDoc: unknown): AsyncAPIDocumentInterface | undefined {
  if (isAsyncAPIDocument(maybeDoc)) {
    return maybeDoc;
  }
  if (!isParsedDocument(maybeDoc)) {
    return;
  }
  return unstringify(maybeDoc) || newAsyncAPIDocument(createDetailedAsyncAPI(maybeDoc, maybeDoc as any));
}

export function isAsyncAPIDocument(maybeDoc: unknown): maybeDoc is AsyncAPIDocumentInterface {
  return maybeDoc instanceof AsyncAPIDocumentV2 || maybeDoc instanceof AsyncAPIDocumentV3;
}

export function isParsedDocument(maybeDoc: unknown): maybeDoc is Record<string, unknown> {
  if (typeof maybeDoc !== 'object' || maybeDoc === null) {
    return false;
  }
  return Boolean((maybeDoc as Record<string, unknown>)[xParserSpecParsed]);
}

export function isStringifiedDocument(maybeDoc: unknown): maybeDoc is Record<string, unknown> {
  if (typeof maybeDoc !== 'object' || maybeDoc === null) {
    return false;
  }
  return (
    Boolean((maybeDoc as Record<string, unknown>)[xParserSpecParsed]) &&
    Boolean((maybeDoc as Record<string, unknown>)[xParserSpecStringified])
  );
}
