import type { Parser } from '../parser';
import type { DetailedAsyncAPI, SchemaValidateResult } from '../types';

export interface ValidateSchemaInput<D = unknown, M = unknown> {
  readonly asyncapi: DetailedAsyncAPI;
  readonly data: D;
  readonly meta: M;
  readonly path: Array<string | number>;
  readonly schemaFormat: string;
  readonly defaultSchemaFormat: string;
}

export interface ParseSchemaInput<D = unknown, M = unknown> {
  readonly asyncapi: DetailedAsyncAPI;
  readonly data: D;
  readonly meta: M;
  readonly path: Array<string | number>;
  readonly schemaFormat: string;
  readonly defaultSchemaFormat: string;
}

export interface SchemaParser<D = unknown, M = unknown> {
  validate: (input: ValidateSchemaInput<D, M>) => void | SchemaValidateResult[] | Promise<void | SchemaValidateResult[]>;
  parse: (input: ParseSchemaInput<D, M>) => unknown | Promise<unknown>;
  getMimeTypes: () => Array<string>;
}

export async function validateSchema(parser: Parser, input: ParseSchemaInput) {
  const schemaParser = parser.parserRegistry.get(input.schemaFormat);
  if (schemaParser === undefined) {
    // throw appropriate error
    throw new Error();
  }
  return schemaParser.validate(input);
}

export async function parseSchema(parser: Parser, input: ParseSchemaInput) {
  const schemaParser = parser.parserRegistry.get(input.schemaFormat);
  if (schemaParser === undefined) {
    return;
  }
  return schemaParser.parse(input);
}

export function registerSchemaParser(parser: Parser, schemaParser: SchemaParser) {
  if (
    typeof schemaParser !== 'object' 
      || typeof schemaParser.validate !== 'function' 
      || typeof schemaParser.parse !== 'function' 
      || typeof schemaParser.getMimeTypes !== 'function'
  ) {
    throw new Error('custom parser must have "parse()", "validate()" and "getMimeTypes()" functions.');
  }

  schemaParser.getMimeTypes().forEach(schemaFormat => {
    parser.parserRegistry.set(schemaFormat, schemaParser);
  });
}

export function getDefaultSchemaFormat(asyncapiVersion: string) {
  return `application/vnd.aai.asyncapi;version=${asyncapiVersion}`;
}
