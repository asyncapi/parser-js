import { createAsyncAPIDocument as createAsyncAPIDocumentParserV2 } from 'parserv2';
import { createAsyncAPIDocument as createAsyncAPIDocumentParserV3 } from 'parserv3';

import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceParserV2 } from 'parserv2';
import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceParserV3 } from 'parserv3';

import type { DetailedAsyncAPI as DetailedAsyncAPIParserV2 } from 'parserv2/esm/types';
import type { DetailedAsyncAPI as DetailedAsyncAPIParserV3 } from 'parserv3/esm/types';

export type AsyncAPIDocument = AsyncAPIDocumentInterfaceParserV2 | AsyncAPIDocumentInterfaceParserV3;

export function ConvertDocumentParserAPIVersion(doc: AsyncAPIDocument, toParserAPIMajorVersion: number): AsyncAPIDocument {
  if (!doc || !doc.json) return doc;
    
  const docParserAPI = doc.extensions().get('x-parser-api-version')?.value();
  const docParserAPIMajorVersion: number = docParserAPI || 0;

  if (docParserAPIMajorVersion === toParserAPIMajorVersion) {
    return doc; // Nothing to do
  }

  const detailedAsyncAPI = doc.meta().asyncapi;
  switch (toParserAPIMajorVersion) {
  case 1:
    return createAsyncAPIDocumentParserV2(detailedAsyncAPI as DetailedAsyncAPIParserV2);
  case 2:
    return createAsyncAPIDocumentParserV3(detailedAsyncAPI as DetailedAsyncAPIParserV3);
  default: 
    return doc;
  }
}