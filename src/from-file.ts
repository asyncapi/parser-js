import { readFile } from 'node:fs/promises';
import type { Parser } from './parser';
import type { ParseOptions } from './parse';
import type { ValidateOptions } from './validate';
import type { Input } from './types';
import type { FromResult } from './from';

export function fromFile(parser: Parser, source: string, options?: Parameters<typeof readFile>[1]): FromResult {
  async function readFileFn(): Promise<Input> {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
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
