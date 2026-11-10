import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
import { jsonSchemaV3 } from './json-schema-v3';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema');

import type { SchemaParser, ValidateSchemaInput, ParseSchemaInput, SchemaValidateResult, SpecTypesV2 } from '@asyncapi/parser';
import type { ValidateFunction, ErrorObject } from 'ajv';

export function OpenAPISchemaParser(): SchemaParser {
  return {
    validate,
    parse,
    getMimeTypes,
  };
}
export default OpenAPISchemaParser;

async function validate(input: ValidateSchemaInput<unknown, unknown>): Promise<SchemaValidateResult[]> {
  const validator = getAjvInstance().getSchema('openapi') as ValidateFunction;

  let result: SchemaValidateResult[] = [];
  const valid = validator(input.data);
  if (!valid && validator.errors) {
    result = ajvToSpectralResult(input.path, [...validator.errors]);
  }

  return result;
}

async function parse(input: ParseSchemaInput<unknown, unknown>): Promise<SpecTypesV2.SchemaObject> {
  // The transformation below mutates its input even though `cloneSchema: true` is passed
  // (the library only clones shallowly, leaving nested values like `allOf` entries shared),
  // which breaks parsing when the same schema object is transformed more than once.
  // Deep-clone the input first to keep parsing pure. See https://github.com/asyncapi/parser-js/issues/1249
  const inputSchema = deepCloneSchema(input.data);
  const transformed = toJsonSchema(inputSchema, {
    cloneSchema: true,
    keepNotSupported: [
      'discriminator',
      'readOnly',
      'writeOnly',
      'deprecated',
      'xml',
      'example',
    ],
  });
    
  iterateSchema(transformed);
  return transformed;
}

/**
 * Deep-clone a schema, duplicating any subtree that appears in more than one place.
 *
 * Two built-ins look like they would do the job, and neither does:
 * - `structuredClone` is a *graph* clone: it deliberately preserves shared object identity,
 *   so a schema referenced twice (e.g. from `allOf` and from `properties` of the same
 *   schema) stays a single object and is transformed twice.
 * - `JSON.parse(JSON.stringify(...))` does duplicate shared subtrees, but silently drops
 *   values that are legal in a programmatically built schema object (`undefined`, `Date`)
 *   and throws on `BigInt`.
 *
 * Schemas are documents, so cyclic object graphs are not supported here; the conversion
 * below recurses forever on them whatever this function does.
 */
function deepCloneSchema<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value.getTime()) as unknown as T;
  if (Array.isArray(value)) return value.map(entry => deepCloneSchema(entry)) as unknown as T;

  const clone: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    clone[key] = deepCloneSchema(entry);
  }
  return clone as T;
}

function getMimeTypes() {
  return [
    'application/vnd.oai.openapi;version=3.0.0',
    'application/vnd.oai.openapi+json;version=3.0.0',
    'application/vnd.oai.openapi+yaml;version=3.0.0',
  ];
}

function ajvToSpectralResult(path: Array<string | number>, errors: ErrorObject[]): SchemaValidateResult[] {
  return errors.map(error => {
    return {
      message: error.message,
      path: [...path, ...error.instancePath.replace(/^\//, '').split('/')],
    };
  }) as SchemaValidateResult[];
}

function iterateSchema(schema: any) {
  if (schema.example !== undefined) {
    const examples = schema.examples || [];
    examples.push(schema.example);
    schema.examples = examples;
    delete schema.example;
  }

  if (schema.$schema !== undefined) {
    delete schema.$schema;
  }

  aliasProps(schema.properties);
  aliasProps(schema.patternProperties);
  aliasProps(schema.additionalProperties);
  aliasProps(schema.items);
  aliasProps(schema.additionalItems);
  aliasProps(schema.oneOf);
  aliasProps(schema.anyOf);
  aliasProps(schema.allOf);
  aliasProps(schema.not);
}

function aliasProps(obj: any) {
  for (const key in obj) {
    const prop = obj[key];

    if (prop.xml !== undefined) {
      prop['x-xml'] = prop.xml;
      delete prop.xml;
    }

    iterateSchema(obj[key]);
  }
}

let ajv: Ajv | undefined;
function getAjvInstance(): Ajv {
  if (ajv) {
    return ajv;
  }

  ajv = new Ajv({
    allErrors: true,
    meta: true,
    messages: true,
    strict: false,
    allowUnionTypes: true,
    unicodeRegExp: false,
  });

  addFormats(ajv);
  ajvErrors(ajv);
  ajv.addSchema(jsonSchemaV3, 'openapi');

  return ajv;
}
