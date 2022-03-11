import { AsyncAPIDocumentInterface, newAsyncAPIDocument } from "./models";

import { customOperations } from './custom-operations';
import { validate } from "./lint";
import { stringify, unstringify } from './stringify';
import { createDetailedAsyncAPI, normalizeInput, toAsyncAPIDocument } from "./utils";

import { xParserSpecParsed } from './constants';

import type { ParserInput, ParserOutput } from './types';
import type { ValidateOptions } from './lint';

export interface ParseOptions {
  applyTraits?: boolean;
  parseSchemas?: boolean;
  validateOptions?: ValidateOptions;
}

export async function parse(asyncapi: ParserInput, options?: ParseOptions): Promise<ParserOutput> {
  let maybeDocument = toAsyncAPIDocument(asyncapi);
  if (maybeDocument) {
    return { 
      source: asyncapi,
      parsed: maybeDocument,
      diagnostics: [],
    };
  }

  try {
    const document = normalizeInput(asyncapi as Exclude<ParserInput, AsyncAPIDocumentInterface>);
    options = normalizeOptions(options);

    const { validated, diagnostics } = await validate(document, options.validateOptions);
    if (validated === undefined) {
      return {
        source: asyncapi,
        parsed: undefined,
        diagnostics,
      };
    }

    const doc = {
      ...(validated as Record<string, any>),
      [xParserSpecParsed]: true,
    }
    const parsed = unstringify(stringify(doc))?.json()!;
    
    const detailed = createDetailedAsyncAPI(asyncapi as string | Record<string, unknown>, parsed);
    await customOperations(detailed, options);
    const parsedDoc = newAsyncAPIDocument(parsed);
  
    return { 
      source: asyncapi,
      parsed: parsedDoc,
      diagnostics,
    };
  } catch(err) {
    // TODO: throw proper error
    throw err;
  }
}

const defaultOptions: ParseOptions = {
  applyTraits: true,
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
