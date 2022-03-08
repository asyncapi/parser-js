import type { Parser } from '../parser';
import type { ParseOptions } from '../parse';
import type { AsyncAPIDocumentInterface } from '../models';
import type { DetailedAsyncAPI } from '../types';
export declare function customOperations(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, options: ParseOptions): Promise<void>;
