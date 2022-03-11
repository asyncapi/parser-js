import { AsyncAPIDocumentInterface, newAsyncAPIDocument } from "./models";
import { normalizeInput, toAsyncAPIDocument } from "./utils";
import { validate } from "./lint";

import type { ParserInput, ParserOutput } from './types';
import type { ValidateOptions } from './lint';

export interface ParseOptions {
  applyTraits?: boolean;
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

    const parsed = newAsyncAPIDocument(validated as Record<string, unknown>);
    return { 
      source: asyncapi,
      parsed,
      diagnostics,
    };
  } catch(err) {
    // TODO: throw proper error
    throw Error();
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

  // traits
  if (options.applyTraits === undefined) {
    options.applyTraits = true;
  }

  return options;
}
