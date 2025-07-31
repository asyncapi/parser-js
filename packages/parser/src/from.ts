import { readFile } from 'fs';
import { promisify } from 'util';

import type { Parser } from './parser';
import type { ParseOptions, ParseOutput } from './parse';
import type { ValidateOptions } from './validate';
import type { Input, Diagnostic } from './types';

interface FromResult {
  parse: (options?: ParseOptions) => Promise<ParseOutput>;
  validate: (options?: ValidateOptions) => Promise<Diagnostic[]>;
}

export function fromURL(parser: Parser, source: string, options?: Parameters<typeof fetch>[1]): FromResult {
  async function fetchUrl(): Promise<Input> {
    return (await fetch(source, options)).text();
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

export function fromFile(parser: Parser, source: string, options?: Parameters<typeof readFile.__promisify__>[1]): FromResult {
  async function readFileFn(): Promise<Input> {
    return (await promisify(readFile)(source, options)).toString();
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
