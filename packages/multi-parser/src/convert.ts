import { createAsyncAPIDocument as createAsyncAPIDocumentParserV3 } from '@asyncapi/parser';

import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceParserV3 } from '@asyncapi/parser';

import type { DetailedAsyncAPI as DetailedAsyncAPIParserV3 } from '@asyncapi/parser/esm/types';

export type AsyncAPIDocument = AsyncAPIDocumentInterfaceParserV3;

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
  case 2:
    throw new Error(`Parser API v${toParserAPIMajorVersion} is no longer supported because its pinned dependency carries an unpatchable jsonpath-plus vulnerability (see https://github.com/asyncapi/parser-js/issues/1065). Use Parser API v3 instead.`);
  case 3:
    return createAsyncAPIDocumentParserV3(detailedAsyncAPI as DetailedAsyncAPIParserV3);
  default:
    return doc;
  }
}
