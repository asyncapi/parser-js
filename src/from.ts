import type { RequestInit } from 'node-fetch';
import type { Parser } from './parser';
import type { ParseOptions, ParseOutput } from './parse';
import type { ValidateOptions } from './validate';
import type { Input, Diagnostic } from './types';

export interface FromResult {
  parse: (options?: ParseOptions) => Promise<ParseOutput>;
  validate: (options?: ValidateOptions) => Promise<Diagnostic[]>;
}

export function fromURL(parser: Parser, source: string, options?: RequestInit): FromResult {
  async function fetchUrl(): Promise<Input> {
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
