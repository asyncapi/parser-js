import { AsyncAPIDocumentInterface, newAsyncAPIDocument } from './models';

import { customOperations } from './custom-operations';
import { validate } from './lint';
import { copy } from './stringify';
import { toAsyncAPIDocument } from './document';
import { createDetailedAsyncAPI, normalizeInput } from './utils';

import { xParserSpecParsed } from './constants';

import type { Parser } from './parser';
import type { ValidateOptions } from './lint';
import type { MaybeAsyncAPI, Diagnostic } from './types';

export type ParseInput = string | MaybeAsyncAPI | AsyncAPIDocumentInterface;
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

export async function parse(parser: Parser, asyncapi: ParseInput, options?: ParseOptions): Promise<ParseOutput> {
  const maybeDocument = toAsyncAPIDocument(asyncapi);
  if (maybeDocument) {
    return { 
      document: maybeDocument,
      diagnostics: [],
    };
  }

  try {
    const document = normalizeInput(asyncapi as Exclude<ParseInput, AsyncAPIDocumentInterface>);
    options = normalizeOptions(options);

    const { validated, diagnostics } = await validate(parser, document, { ...options.validateOptions, source: options.source });
    if (validated === undefined) {
      return {
        document: undefined,
        diagnostics,
      };
    }

    // unfreeze the object - Spectral makes resolved document "freezed" 
    const validatedDoc = copy(validated as Record<string, any>);
    validatedDoc[String(xParserSpecParsed)] = true;
    
    const detailed = createDetailedAsyncAPI(asyncapi as string | Record<string, unknown>, validatedDoc);
    const parsedDoc = newAsyncAPIDocument(detailed);
    await customOperations(parser, parsedDoc, detailed, options);
  
    return { 
      document: parsedDoc,
      diagnostics,
    };
  } catch (err: any) {
    // TODO: throw proper error
    throw new Error(err.message);
  }
}

const defaultOptions: ParseOptions = {
  applyTraits: true,
  parseSchemas: true,
};
function normalizeOptions(options?: ParseOptions): ParseOptions {
  if (!options || typeof options !== 'object') {
    return defaultOptions;
  }
  // shall copy
  options = { ...defaultOptions, ...options };

  // applyTraits
  if (options.applyTraits === undefined) {
    options.applyTraits = true;
  }
  // parseSchemas
  if (options.parseSchemas === undefined) {
    options.parseSchemas = true;
  }

  return options;
}
