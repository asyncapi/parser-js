import { AsyncAPIDocumentInterface } from './models';

import { customOperations } from './custom-operations';
import { validate } from './validate';
import { copy } from './stringify';
import { createAsyncAPIDocument } from './document';
import { createDetailedAsyncAPI, mergePatch, setExtension } from './utils';

import { xParserSpecParsed } from './constants';

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

const defaultOptions: ParseOptions = {
  applyTraits: true,
  parseSchemas: true,
  validateOptions: {},
};

export async function parse(parser: Parser, spectral: Spectral, asyncapi: Input, options: ParseOptions = {}): Promise<ParseOutput> {
  options = mergePatch<ParseOptions>(defaultOptions, options);
  const { validated, diagnostics } = await validate(spectral, asyncapi, { ...options.validateOptions, source: options.source });
  if (validated === undefined) {
    return {
      document: undefined,
      diagnostics,
    };
  }

  // unfreeze the object - Spectral makes resolved document "freezed" 
  const validatedDoc = copy(validated as Record<string, any>);
  
  const detailed = createDetailedAsyncAPI(asyncapi as string | Record<string, unknown>, validatedDoc);
  const document = createAsyncAPIDocument(detailed);
  setExtension(xParserSpecParsed, true, document);
  await customOperations(parser, document, detailed, options);

  return { 
    document,
    diagnostics,
  };
}
