import { SchemaParser, ParseSchemaInput, ValidateSchemaInput } from "../schema-parser";
import type { AsyncAPISchema, SchemaValidateResult } from '../types';
import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import * as fs from 'fs';
import * as path from 'path';
const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema');

const schemaV3 = JSON.parse(fs.readFileSync(path.resolve(__dirname, './openapi/schema_v3.json'), 'utf8'));

const ajv = new Ajv({
  allErrors: true,
  strict: false,
  logger: false,
});

ajv.addSchema(schemaV3, "openapi");


export function OpenAPISchemaParser(): SchemaParser {
  return {
    validate,
    parse,
    getMimeTypes,
  }
}

async function validate(input: ValidateSchemaInput<unknown, unknown>): Promise<SchemaValidateResult[]> {
  const validator = ajv.getSchema("openapi") as ValidateFunction;

  let result: SchemaValidateResult[] = []
  const valid = validator(input.data);
  if (!valid && validator.errors) {
    result = ajvToSpectralResult([...validator.errors]);
  }

  return result;
}

async function parse(input: ParseSchemaInput<unknown, unknown>): Promise<AsyncAPISchema> {
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

    const message = (input.meta as any).message
    if (message !== undefined) {
      message['x-parser-original-schema-format'] = input.schemaFormat || input.defaultSchemaFormat;
      message['x-parser-original-payload'] = message.payload;
      message.payload = transformed;
      delete message.schemaFormat;
    };

    return transformed;
}

function getMimeTypes() {
  return [
    'application/vnd.oai.openapi;version=3.0.0',
    'application/vnd.oai.openapi+json;version=3.0.0',
    'application/vnd.oai.openapi+yaml;version=3.0.0',
  ];
}

function ajvToSpectralResult(errors: ErrorObject[]): SchemaValidateResult[] {
  return errors.map(error => {
    const errorPath = error.instancePath.replace(/^\//, '').split('/');

    return {
      message: error.message,
      path: errorPath,
    } as SchemaValidateResult;
  });
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
