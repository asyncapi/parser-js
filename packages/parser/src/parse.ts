import { AsyncAPIDocumentInterface, ParserAPIVersion } from './models';

import { applyUniqueIds, customOperations } from './custom-operations';
import { validate } from './validate';
import { copy } from './stringify';
import { createAsyncAPIDocument } from './document';
import { createDetailedAsyncAPI, mergePatch, setExtension, createUncaghtDiagnostic, hasErrorDiagnostic } from './utils';

import { xParserSpecParsed, xParserApiVersion } from './constants';

import type { Spectral, RulesetFunctionContext } from '@stoplight/spectral-core';
import { Document } from '@stoplight/spectral-core';
import type { Parser } from './parser';
import type { ResolverOptions } from './resolver';
import type { ValidateOptions } from './validate';
import type { Input, Diagnostic, DetailedAsyncAPI } from './types';

export interface ParseOutput {
  document: AsyncAPIDocumentInterface | undefined;
  diagnostics: Diagnostic[];
  extras?: {
    document: Document;
  }
}

export interface ParseOptions {
  source?: string;
  applyTraits?: boolean;
  parseSchemas?: boolean;
  validateOptions?: Omit<ValidateOptions, 'source'>;
  /**
   * If `true`, the parser will throw an `AsyncAPIParseError` when the input
   * document fails validation (i.e. one or more diagnostics with
   * `severity === DiagnosticSeverity.Error` are produced). The thrown error
   * carries the diagnostics on its `diagnostics` property.
   *
   * Defaults to `false` to preserve the historical "return undefined document
   * alongside diagnostics" behavior. See https://github.com/asyncapi/parser-js/issues/878
   */
  throwOnError?: boolean;
  __unstable?: {
    resolver?: Omit<ResolverOptions, 'cache'>;
  };
}

const defaultOptions: ParseOptions = {
  applyTraits: true,
  parseSchemas: true,
  throwOnError: false,
  validateOptions: {},
  __unstable: {},
};

export async function parse(parser: Parser, spectral: Spectral, asyncapi: Input, options: ParseOptions = {}): Promise<ParseOutput> {
  let spectralDocument: Document | undefined;

  try {
    options = mergePatch<ParseOptions>(defaultOptions, options);
    
    // `./src/validate.ts` enforces 'string' type on both YAML and JSON later in
    // code, and parses them both using the same `@stoplight/yaml`, so forceful
    // normalization of YAML to JSON here has no practical application. It only
    // causes `range` to be reported incorrectly in `diagnostics` by misleading
    // `Parser` into thinking it's dealing with JSON instead of YAML, creating
    // the bug described in https://github.com/asyncapi/parser-js/issues/936
    
    const { validated, diagnostics, extras } = await validate(parser, spectral, asyncapi, { ...options.validateOptions, source: options.source, __unstable: options.__unstable });
    if (validated === undefined) {
      // Issue #878: when validation fails the parser used to silently return
      // a result with `document: undefined`, which made it easy for callers to
      // miss the failure (e.g. `result.document()` would throw a confusing
      // "is not a function" error). With `throwOnError` enabled we surface the
      // failure with a descriptive error instead.
      if (options.throwOnError && hasErrorDiagnostic(diagnostics)) {
        throw new AsyncAPIParseError(
          'AsyncAPI document failed validation. See the `diagnostics` property for details.',
          diagnostics,
          extras?.document
        );
      }
      return {
        document: undefined,
        diagnostics,
        extras
      };
    }

    spectralDocument = extras.document;
    const inventory: RulesetFunctionContext['documentInventory'] = (spectralDocument as any).__documentInventory;
  
    // unfreeze the object - Spectral makes resolved document "freezed" 
    const validatedDoc = copy(validated as Record<string, any>);

    // Apply unique ids which are used as part of iterating between channels <-> operations <-> messages
    applyUniqueIds(validatedDoc);
    const detailed = createDetailedAsyncAPI(validatedDoc, asyncapi as DetailedAsyncAPI['input'], options.source);
    const document = createAsyncAPIDocument(detailed);
    setExtension(xParserSpecParsed, true, document);
    setExtension(xParserApiVersion, ParserAPIVersion, document);
    await customOperations(parser, document, detailed, inventory, options);
    
    return { 
      document,
      diagnostics,
      extras,
    };
  } catch (err: unknown) {
    if (err instanceof AsyncAPIParseError) {
      throw err;
    }
    return { document: undefined, diagnostics: createUncaghtDiagnostic(err, 'Error thrown during AsyncAPI document parsing', spectralDocument), extras: undefined };
  }
}

export class AsyncAPIParseError extends Error {
  public readonly diagnostics: Diagnostic[];
  public readonly document?: Document;

  constructor(message: string, diagnostics: Diagnostic[], document?: Document) {
    super(message);
    this.name = 'AsyncAPIParseError';
    this.diagnostics = diagnostics;
    this.document = document;
  }
}
