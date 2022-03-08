import type { AsyncAPIDocumentInterface } from './models';
import type { DetailedAsyncAPI } from './types';
export declare function createAsyncAPIDocument(asyncapi: DetailedAsyncAPI): AsyncAPIDocumentInterface;
export declare function toAsyncAPIDocument(maybeDoc: unknown): AsyncAPIDocumentInterface | undefined;
export declare function isAsyncAPIDocument(maybeDoc: unknown): maybeDoc is AsyncAPIDocumentInterface;
export declare function isParsedDocument(maybeDoc: unknown): maybeDoc is Record<string, unknown>;
export declare function isStringifiedDocument(maybeDoc: unknown): maybeDoc is Record<string, unknown>;
