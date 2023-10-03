import { AsyncAPIDocumentV2, AsyncAPIDocumentV3 } from './models';
import { unstringify } from './stringify';
import { createDetailedAsyncAPI } from './utils';

import { 
  xParserSpecParsed,
  xParserSpecStringified,
  xParserApiVersion,
} from './constants';

import type { AsyncAPIDocumentInterface } from './models';
import type { OldAsyncAPIDocument } from './old-api';
import type { DetailedAsyncAPI, AsyncAPIObject } from './types';
import { v2, v3 } from 'spec-types';

export function createAsyncAPIDocument(asyncapi: DetailedAsyncAPI): AsyncAPIDocumentInterface {
  switch (asyncapi.semver.major) {
  case 2:
    return new AsyncAPIDocumentV2(asyncapi.parsed as v2.AsyncAPIObject, { asyncapi, pointer: '/' });
  case 3:
    return new AsyncAPIDocumentV3(asyncapi.parsed as v3.AsyncAPIObject, { asyncapi, pointer: '/' });
  default:
    throw new Error(`Unsupported AsyncAPI version: ${asyncapi.semver.version}`);
  }
}

export function toAsyncAPIDocument(maybeDoc: unknown): AsyncAPIDocumentInterface | undefined {
  if (isAsyncAPIDocument(maybeDoc)) {
    return maybeDoc;
  }
  if (!isParsedDocument(maybeDoc)) {
    return unstringify(maybeDoc);
  }
  return createAsyncAPIDocument(createDetailedAsyncAPI(maybeDoc as any, maybeDoc));
}

export function isAsyncAPIDocument(maybeDoc: unknown): maybeDoc is AsyncAPIDocumentInterface {
  if (!maybeDoc) {
    return false;
  }
  if (maybeDoc instanceof AsyncAPIDocumentV2 || maybeDoc instanceof AsyncAPIDocumentV3) {
    return true;
  }
  if (maybeDoc && typeof (maybeDoc as AsyncAPIDocumentInterface).json === 'function') {
    const versionOfParserAPI = (maybeDoc as AsyncAPIDocumentInterface).json()[xParserApiVersion];
    return versionOfParserAPI === 2;
  }
  return false;
}

export function isOldAsyncAPIDocument(maybeDoc: unknown): maybeDoc is OldAsyncAPIDocument {
  if (maybeDoc && typeof (maybeDoc as OldAsyncAPIDocument).json === 'function') {
    const versionOfParserAPI = (maybeDoc as OldAsyncAPIDocument).json()[xParserApiVersion];
    return versionOfParserAPI === undefined || versionOfParserAPI === 0;
  }
  return false;
}

export function isParsedDocument(maybeDoc: unknown): maybeDoc is AsyncAPIObject {
  if (typeof maybeDoc !== 'object' || maybeDoc === null) {
    return false;
  }
  return Boolean((maybeDoc as AsyncAPIObject)[xParserSpecParsed]);
}

export function isStringifiedDocument(maybeDoc: unknown): maybeDoc is AsyncAPIObject {
  try {
    maybeDoc = typeof maybeDoc === 'string' ? JSON.parse(maybeDoc) : maybeDoc;
    if (typeof maybeDoc !== 'object' || maybeDoc === null) {
      return false;
    }
    return (
      Boolean((maybeDoc as AsyncAPIObject)[xParserSpecParsed]) &&
      Boolean((maybeDoc as AsyncAPIObject)[xParserSpecStringified])
    );
  } catch (_: unknown) {
    return false;
  }
}
