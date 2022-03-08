"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringifiedDocument = exports.isParsedDocument = exports.isAsyncAPIDocument = exports.toAsyncAPIDocument = exports.createAsyncAPIDocument = void 0;
const models_1 = require("./models");
const stringify_1 = require("./stringify");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
function createAsyncAPIDocument(asyncapi) {
    switch (asyncapi.semver.major) {
        case 2:
            return new models_1.AsyncAPIDocumentV2(asyncapi.parsed, { asyncapi, pointer: '/' });
        // case 3:
        //   return new AsyncAPIDocumentV3(asyncapi.parsed, { asyncapi, pointer: '/' });
        default:
            throw new Error(`Unsupported AsyncAPI version: ${asyncapi.semver.version}`);
    }
}
exports.createAsyncAPIDocument = createAsyncAPIDocument;
function toAsyncAPIDocument(maybeDoc) {
    if (isAsyncAPIDocument(maybeDoc)) {
        return maybeDoc;
    }
    if (!isParsedDocument(maybeDoc)) {
        return;
    }
    return (0, stringify_1.unstringify)(maybeDoc) || createAsyncAPIDocument((0, utils_1.createDetailedAsyncAPI)(maybeDoc, maybeDoc));
}
exports.toAsyncAPIDocument = toAsyncAPIDocument;
function isAsyncAPIDocument(maybeDoc) {
    return maybeDoc instanceof models_1.AsyncAPIDocumentV2 || maybeDoc instanceof models_1.AsyncAPIDocumentV3;
}
exports.isAsyncAPIDocument = isAsyncAPIDocument;
function isParsedDocument(maybeDoc) {
    if (typeof maybeDoc !== 'object' || maybeDoc === null) {
        return false;
    }
    return Boolean(maybeDoc[constants_1.xParserSpecParsed]);
}
exports.isParsedDocument = isParsedDocument;
function isStringifiedDocument(maybeDoc) {
    if (typeof maybeDoc !== 'object' || maybeDoc === null) {
        return false;
    }
    return (Boolean(maybeDoc[constants_1.xParserSpecParsed]) &&
        Boolean(maybeDoc[constants_1.xParserSpecStringified]));
}
exports.isStringifiedDocument = isStringifiedDocument;
