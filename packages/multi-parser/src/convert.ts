import { createAsyncAPIDocument as createAsyncAPIDocumentParserV1 } from 'parserapiv1';
import { createAsyncAPIDocument as createAsyncAPIDocumentParserV2 } from 'parserapiv2';
import { createAsyncAPIDocument as createAsyncAPIDocumentParserV3 } from '@asyncapi/parser/esm/index';

import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceParserV1 } from 'parserapiv1';
import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceParserV2 } from 'parserapiv2';
import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceParserV3 } from '@asyncapi/parser/esm/index';

import type { DetailedAsyncAPI as DetailedAsyncAPIParserV1 } from 'parserapiv1/esm/types';
import type { DetailedAsyncAPI as DetailedAsyncAPIParserV2 } from 'parserapiv2/esm/types';
import type { DetailedAsyncAPI as DetailedAsyncAPIParserV3 } from '@asyncapi/parser/esm/types';

export type AsyncAPIDocument = AsyncAPIDocumentInterfaceParserV1 | AsyncAPIDocumentInterfaceParserV2 | AsyncAPIDocumentInterfaceParserV3;

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
    return createAsyncAPIDocumentParserV1(detailedAsyncAPI as DetailedAsyncAPIParserV1);
  case 2:
    return createAsyncAPIDocumentParserV2(detailedAsyncAPI as DetailedAsyncAPIParserV2);
  case 3:
    return createAsyncAPIDocumentParserV3(detailedAsyncAPI as DetailedAsyncAPIParserV3);
  default: 
    return doc;
  }
}
