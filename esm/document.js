import { AsyncAPIDocumentV2, AsyncAPIDocumentV3 } from './models';
import { unstringify } from './stringify';
import { createDetailedAsyncAPI } from './utils';
import { xParserSpecParsed, xParserSpecStringified, } from './constants';
export function createAsyncAPIDocument(asyncapi) {
    switch (asyncapi.semver.major) {
        case 2:
            return new AsyncAPIDocumentV2(asyncapi.parsed, { asyncapi, pointer: '/' });
        // case 3:
        //   return new AsyncAPIDocumentV3(asyncapi.parsed, { asyncapi, pointer: '/' });
        default:
            throw new Error(`Unsupported AsyncAPI version: ${asyncapi.semver.version}`);
    }
}
export function toAsyncAPIDocument(maybeDoc) {
    if (isAsyncAPIDocument(maybeDoc)) {
        return maybeDoc;
    }
    if (!isParsedDocument(maybeDoc)) {
        return;
    }
    return unstringify(maybeDoc) || createAsyncAPIDocument(createDetailedAsyncAPI(maybeDoc, maybeDoc));
}
export function isAsyncAPIDocument(maybeDoc) {
    return maybeDoc instanceof AsyncAPIDocumentV2 || maybeDoc instanceof AsyncAPIDocumentV3;
}
export function isParsedDocument(maybeDoc) {
    if (typeof maybeDoc !== 'object' || maybeDoc === null) {
        return false;
    }
    return Boolean(maybeDoc[xParserSpecParsed]);
}
export function isStringifiedDocument(maybeDoc) {
    if (typeof maybeDoc !== 'object' || maybeDoc === null) {
        return false;
    }
    return (Boolean(maybeDoc[xParserSpecParsed]) &&
        Boolean(maybeDoc[xParserSpecStringified]));
}
