import { Spectral } from '@stoplight/spectral-core';

import { toAsyncAPIDocument } from './document';
import { parse } from './parse';
import { validate } from './validate';
import { registerSchemaParser } from './schema-parser';
import { AsyncAPISchemaParser } from './schema-parser/asyncapi-schema-parser';
import { createSpectral } from './spectral';

import type { ParseOptions, ParseOutput } from './parse';
import type { ValidateOptions } from './validate';
import type { SchemaParser } from './schema-parser';
import type { Diagnostic, Input } from './types';

export interface ParserOptions {}

export class Parser {
  protected readonly parserRegistry = new Map<string, SchemaParser>();
  protected readonly spectral: Spectral;

  constructor(
    private readonly _: ParserOptions = {}
  ) {
    this.spectral = createSpectral(this);
    this.registerSchemaParser(AsyncAPISchemaParser());
  }

  async parse(asyncapi: Input, options?: ParseOptions): Promise<ParseOutput> {
    const maybeDocument = toAsyncAPIDocument(asyncapi);
    if (maybeDocument) {
      return { 
        document: maybeDocument,
        diagnostics: [],
      };
    }
    return parse(this, this.spectral, asyncapi, options);
  }

  async validate(asyncapi: Input, options?: ValidateOptions): Promise<Diagnostic[]> {
    const maybeDocument = toAsyncAPIDocument(asyncapi);
    if (maybeDocument) {
      return [];
    }
    return (await validate(this.spectral, asyncapi, options)).diagnostics;
  }

  registerSchemaParser(parser: SchemaParser) {
    return registerSchemaParser(this, parser);
  }
}
