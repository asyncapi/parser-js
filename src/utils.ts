import { AsyncAPIDocument } from './models';
import { unstringify } from './stringify';

import { 
  xParserSpecParsed,
  xParserSpecStringified,
} from './constants';

export function toAsyncAPIDocument(maybeDoc: unknown): AsyncAPIDocument | undefined {
  if (isAsyncAPIDocument(maybeDoc)) {
    return maybeDoc;
  }
  if (!isParsedDocument(maybeDoc)) {
    return;
  }
  return unstringify(maybeDoc) || new AsyncAPIDocument(maybeDoc);
}

export function isAsyncAPIDocument(maybeDoc: unknown): maybeDoc is AsyncAPIDocument {
  return maybeDoc instanceof AsyncAPIDocument;
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
