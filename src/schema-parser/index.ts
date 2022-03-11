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

const PARSERS = new Map<string, SchemaParser>();

export async function validateSchema(input: ParseSchemaInput) {
  const parser = getSchemaParser(input.schemaFormat);
  if (parser === undefined) {
    // throw appropriate error
    throw new Error();
  }
  return parser.validate(input);
}

export async function parseSchema(input: ParseSchemaInput) {
  const parser = getSchemaParser(input.schemaFormat);
  if (parser === undefined) {
    return;
  }
  return parser.parse(input);
}

export function registerSchemaParser(parser: SchemaParser) {
  if (
    typeof parser !== 'object' 
      || typeof parser.validate !== 'function' 
      || typeof parser.parse !== 'function' 
      || typeof parser.getMimeTypes !== 'function'
  ) {
    throw new Error('custom parser must have "parse()", "validate()" and "getMimeTypes()" functions.');
  }

  parser.getMimeTypes().forEach(schemaFormat => {
    PARSERS.set(schemaFormat, parser);
  });
}

export function getSchemaParser(mimeType: string) {
  return PARSERS.get(mimeType);
}

export function getDefaultSchemaFormat(asyncapiVersion: string) {
  return `application/vnd.aai.asyncapi;version=${asyncapiVersion}`;
}
