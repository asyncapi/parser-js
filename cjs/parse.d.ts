import { AsyncAPIDocumentInterface } from './models';
import type { Spectral } from '@stoplight/spectral-core';
import type { Parser } from './parser';
import type { ValidateOptions } from './validate';
import type { Input, Diagnostic } from './types';
export interface ParseOutput {
    document: AsyncAPIDocumentInterface | undefined;
    diagnostics: Diagnostic[];
}
export interface ParseOptions {
    source?: string;
    applyTraits?: boolean;
    parseSchemas?: boolean;
    validateOptions?: Omit<ValidateOptions, 'source'>;
}
export declare function parse(parser: Parser, spectral: Spectral, asyncapi: Input, options?: ParseOptions): Promise<ParseOutput>;
