import type { Parser } from '../parser';
import type { AsyncAPISchema, DetailedAsyncAPI, SchemaValidateResult } from '../types';

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
  parse: (input: ParseSchemaInput<D, M>) => AsyncAPISchema | Promise<AsyncAPISchema>;
  getMimeTypes: () => Array<string>;
}

export async function validateSchema(parser: Parser, input: ValidateSchemaInput) {
  const schemaParser = parser.parserRegistry.get(input.schemaFormat);
  // Custom schema formats are allowed by the AsyncAPI spec; implementation is OPTIONAL.
  // Skip validation when no registered parser handles the format (#1066).
  if (schemaParser === undefined) {
    return [];
  }
  return schemaParser.validate(input);
}

export async function parseSchema(parser: Parser, input: ParseSchemaInput): Promise<AsyncAPISchema> {
  const schemaParser = parser.parserRegistry.get(input.schemaFormat);
  if (schemaParser === undefined) {
    return input.data as AsyncAPISchema;
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
  if (typeof schematFormat === 'string') {
    return schematFormat;
  }
  return getDefaultSchemaFormat(asyncapiVersion);
}

export function getDefaultSchemaFormat(asyncapiVersion: string) {
  return `application/vnd.aai.asyncapi;version=${asyncapiVersion}`;
}
