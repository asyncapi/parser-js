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
  const transformed = toJsonSchema(input.data, {
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
