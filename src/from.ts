import { readFile } from 'fs/promises';

import type { RequestInit } from 'node-fetch';
import type { Parser } from './parser';
import type { ParseInput, ParseOptions, ParseOutput } from './parse';
import type { ValidateOptions, ValidateOutput } from './lint';

interface FromResult {
  parse: (options?: ParseOptions) => Promise<ParseOutput>;
  validate: (options?: ValidateOptions) => Promise<ValidateOutput>;
}

export function fromURL(parser: Parser, source: string, options?: RequestInit): FromResult {
  async function fetchUrl(): Promise<ParseInput> {
    const fetchFn = await getFetch();
    return (await fetchFn(source, options as any)).text();
  }

  return {
    async parse(options: ParseOptions = {}) {
      const schema = await fetchUrl();
      return parser.parse(schema, { ...options, source });
    },
    async validate(options: ValidateOptions = {}) {
      const schema = await fetchUrl();
      return parser.validate(schema, { ...options, source });
    }
  };
}

export function fromFile(parser: Parser, source: string, options?: Parameters<typeof readFile>[1]): FromResult {
  async function readFileFn(): Promise<ParseInput> {
    return (await readFile(source, options)).toString();
  }

  return {
    async parse(options: ParseOptions = {}) {
      const schema = await readFileFn();
      return parser.parse(schema, { ...options, source });
    },
    async validate(options: ValidateOptions = {}) {
      const schema = await readFileFn();
      return parser.validate(schema, { ...options, source });
    }
  };
}

let __fetchFn: typeof fetch | undefined;
async function getFetch(): Promise<typeof fetch> {
  if (__fetchFn) {
    return __fetchFn;
  }

  if (typeof fetch === 'undefined') {
    return __fetchFn = (await import('node-fetch')).default as unknown as typeof fetch;
  }
  return (__fetchFn = fetch);
}
