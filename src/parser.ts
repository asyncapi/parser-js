import { toAsyncAPIDocument } from './document';
import { parse } from './parse';
import { validate } from './validate';
import { registerSchemaParser } from './schema-parser';
import { AsyncAPISchemaParser } from './schema-parser/asyncapi-schema-parser';
import { createSpectral } from './spectral';

import type { Spectral, RulesetDefinition } from '@stoplight/spectral-core';
import type { ParseOptions, ParseOutput } from './parse';
import type { ValidateOptions } from './validate';
import type { ResolverOptions } from './resolver';
import type { SchemaParser } from './schema-parser';
import type { Diagnostic, Input } from './types';

export interface ParserOptions {
  ruleset?: RulesetDefinition
  schemaParsers?: Array<SchemaParser>;
  __unstable?: {
    resolver?: ResolverOptions;
  };
}

export class Parser {
  public readonly parserRegistry = new Map<string, SchemaParser>();
  protected readonly spectral: Spectral;

  constructor(
    private readonly options: ParserOptions = {}
  ) {
    this.spectral = createSpectral(this, options);
    this.registerSchemaParser(AsyncAPISchemaParser());
    this.options.schemaParsers?.forEach(parser => this.registerSchemaParser(parser));
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
    return (await validate(this, this.spectral, asyncapi, options)).diagnostics;
  }

  registerSchemaParser(parser: SchemaParser) {
    return registerSchemaParser(this, parser);
  }
}
