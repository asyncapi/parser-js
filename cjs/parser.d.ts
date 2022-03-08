import type { Spectral } from '@stoplight/spectral-core';
import type { ParseOptions, ParseOutput } from './parse';
import type { ValidateOptions } from './validate';
import type { ResolverOptions } from './resolver';
import type { SchemaParser } from './schema-parser';
import type { Diagnostic, Input } from './types';
export interface ParserOptions {
    schemaParsers?: Array<SchemaParser>;
    __unstable?: {
        resolver?: ResolverOptions;
    };
}
export declare class Parser {
    private readonly options;
    readonly parserRegistry: Map<string, SchemaParser<unknown, unknown>>;
    protected readonly spectral: Spectral;
    constructor(options?: ParserOptions);
    parse(asyncapi: Input, options?: ParseOptions): Promise<ParseOutput>;
    validate(asyncapi: Input, options?: ValidateOptions): Promise<Diagnostic[]>;
    registerSchemaParser(parser: SchemaParser): void;
}
