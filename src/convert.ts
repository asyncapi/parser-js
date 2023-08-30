import { createAsyncAPIDocument as createAsyncAPIDocumentParserV2 } from 'parserv2';
import { createAsyncAPIDocument as createAsyncAPIDocumentParserV3 } from 'parserv3';

import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceParserV2 } from 'parserv2';
import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceParserV3 } from 'parserv3';

import type { DetailedAsyncAPI as DetailedAsyncAPIParserV2 } from 'parserv2/esm/types';
import type { DetailedAsyncAPI as DetailedAsyncAPIParserV3 } from 'parserv3/esm/types';

import { majorParserAPIVersion } from './utils';

export type AsyncAPIDocument = AsyncAPIDocumentInterfaceParserV2 | AsyncAPIDocumentInterfaceParserV3;

export function ConvertDocumentParserAPIVersion(doc: AsyncAPIDocument, toParserAPIVersion: string): AsyncAPIDocument {
  if (!doc || !doc.json) return doc;
    
  const docParserAPI = doc.extensions().get('x-parser-api-version')?.value();
  const docParserAPIMajorVersion: number = docParserAPI ? Number(String(docParserAPI).split('.')[0]) : 0;
  const toMajorParserAPIVersion = majorParserAPIVersion(toParserAPIVersion);

  if (docParserAPIMajorVersion === toMajorParserAPIVersion) {
    return doc; // Nothing to do
  }

  const detailedAsyncAPI = doc.meta().asyncapi;
  switch (toMajorParserAPIVersion) {
  case 1:
    return createAsyncAPIDocumentParserV2(detailedAsyncAPI as DetailedAsyncAPIParserV2);
    // break;
  case 2:
    return createAsyncAPIDocumentParserV3(detailedAsyncAPI as DetailedAsyncAPIParserV3);
  default: 
    return doc;
  }
}