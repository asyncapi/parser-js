import { AsyncAPIDocumentInterface, newAsyncAPIDocument } from './models';

import { customOperations } from './custom-operations';
import { validate } from './lint';
import { unfreeze } from './stringify';
import { toAsyncAPIDocument } from './document';
import { createDetailedAsyncAPI, normalizeInput } from './utils';

import { xParserSpecParsed } from './constants';

import type { Parser } from './parser';
import type { ValidateOptions } from './lint';
import type { MaybeAsyncAPI, Diagnostic } from './types';

export type ParseInput = string | MaybeAsyncAPI | AsyncAPIDocumentInterface;
export interface ParseOutput {
  source: ParseInput;
  parsed: AsyncAPIDocumentInterface | undefined;
  diagnostics: Diagnostic[]; 
}

export interface ParseOptions {
  applyTraits?: boolean;
  parseSchemas?: boolean;
  validateOptions?: ValidateOptions;
}

export async function parse(parser: Parser, asyncapi: ParseInput, options?: ParseOptions): Promise<ParseOutput> {
  const maybeDocument = toAsyncAPIDocument(asyncapi);
  if (maybeDocument) {
    return { 
      source: asyncapi,
      parsed: maybeDocument,
      diagnostics: [],
    };
  }

  try {
    const document = normalizeInput(asyncapi as Exclude<ParseInput, AsyncAPIDocumentInterface>);
    options = normalizeOptions(options);

    const { validated, diagnostics } = await validate(parser, document, options.validateOptions);
    if (validated === undefined) {
      return {
        source: asyncapi,
        parsed: undefined,
        diagnostics,
      };
    }

    // unfreeze the object - Spectral makes resolved document "freezed" 
    const validatedDoc = unfreeze(validated as Record<string, any>);
    validatedDoc[String(xParserSpecParsed)] = true;
    
    const detailed = createDetailedAsyncAPI(asyncapi as string | Record<string, unknown>, validatedDoc);
    await customOperations(parser, detailed, options);
    const parsedDoc = newAsyncAPIDocument(detailed);
  
    return { 
      source: asyncapi,
      parsed: parsedDoc,
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
