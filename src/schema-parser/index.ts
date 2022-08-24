import type { Parser } from '../parser';
import type { AsyncAPISchema, DetailedAsyncAPI, SchemaValidateResult } from '../types';

export interface ValidateSchemaInput<D = unknown, M = unknown> {
  readonly asyncapi: Exclude<DetailedAsyncAPI, 'parsed'>;
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
  parse: (input: ParseSchemaInput<D, M>) => AsyncAPISchema | Promise<AsyncAPISchema>;
  getMimeTypes: () => Array<string>;
}

export async function validateSchema(parser: Parser, input: ValidateSchemaInput) {
  const schemaParser = parser.parserRegistry.get(input.schemaFormat);
  if (schemaParser === undefined) {
    throw new Error('Unknown schema format');
  }
  return schemaParser.validate(input);
}

export async function parseSchema(parser: Parser, input: ParseSchemaInput) {
  const schemaParser = parser.parserRegistry.get(input.schemaFormat);
  if (schemaParser === undefined) {
    throw new Error('Unknown schema format');
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
    throw new Error('Custom parser must have "parse()", "validate()" and "getMimeTypes()" functions.');
  }

  schemaParser.getMimeTypes().forEach(schemaFormat => {
    parser.parserRegistry.set(schemaFormat, schemaParser);
  });
}

export function getSchemaFormat(schematFormat: string | undefined, asyncapiVersion: string) {
  if (schematFormat) {
    return schematFormat;
  }
  return getDefaultSchemaFormat(asyncapiVersion);
}

export function getDefaultSchemaFormat(asyncapiVersion: string) {
  return `application/vnd.aai.asyncapi;version=${asyncapiVersion}`;
}
