import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
import specs from '@asyncapi/specs';

import { specVersions } from '../constants';

import type { ErrorObject, ValidateFunction } from 'ajv';
import type { JSONSchema7 } from 'json-schema';
import type { AsyncAPISchema, SchemaValidateResult } from '../types';
import type { SchemaParser, ParseSchemaInput, ValidateSchemaInput } from '../schema-parser';

export function AsyncAPISchemaParser(): SchemaParser {
  return {
    validate,
    parse,
    getMimeTypes,
  };
}

async function validate(input: ValidateSchemaInput<unknown, unknown>): Promise<SchemaValidateResult[]> {
  const version = input.asyncapi.semver.version;
  const validator = getSchemaValidator(version);

  let result: SchemaValidateResult[] = [];
  const valid = validator(input.data);
  if (!valid && validator.errors) {
    result = ajvToSpectralResult(input.path, [...validator.errors]);
  }

  return result;
}

async function parse(input: ParseSchemaInput<unknown, unknown>): Promise<AsyncAPISchema> {
  return input.data as AsyncAPISchema;
}

function getMimeTypes() {
  const mimeTypes = [
    'application/schema;version=draft-07',
    'application/schema+json;version=draft-07',
    'application/schema+yaml;version=draft-07',
  ];

  specVersions.forEach((version: string) => {
    mimeTypes.push(
      `application/vnd.aai.asyncapi;version=${version}`,
      `application/vnd.aai.asyncapi+json;version=${version}`,
      `application/vnd.aai.asyncapi+yaml;version=${version}`,
    );
  });
  return mimeTypes;
}

function ajvToSpectralResult(path: Array<string | number>, errors: ErrorObject[]): SchemaValidateResult[] {
  return errors.map(error => {
    return {
      message: error.message,
      path: [...path, ...error.instancePath.replace(/^\//, '').split('/')],
    };
  }) as SchemaValidateResult[];
}

function getSchemaValidator(version: string): ValidateFunction {
  const ajv = getAjvInstance();
  let validator = ajv.getSchema(version);
  if (!validator) {
    const schema = preparePayloadSchema(specs.schemas[version as keyof typeof specs.schemas], version);

    ajv.addSchema(schema, version);
    validator = ajv.getSchema(version);
  }

  return validator as ValidateFunction;
}

/**
 * To validate the schema of the payload we just need a small portion of official AsyncAPI spec JSON Schema, the Schema Object in particular. The definition of Schema Object must be
 * included in the returned JSON Schema.
 */
function preparePayloadSchema(asyncapiSchema: JSONSchema7, version: string): JSONSchema7 {
  const payloadSchema = `http://asyncapi.com/definitions/${version}/schema.json`;
  const definitions = asyncapiSchema.definitions;
  if (definitions === undefined) {
    throw new Error('AsyncAPI schema must contain definitions');
  }

  // Remove the meta schemas because they are already present within Ajv, and it's not possible to add duplicated schemas.
  delete definitions['http://json-schema.org/draft-07/schema'];
  delete definitions['http://json-schema.org/draft-04/schema'];
  
  return {
    $ref: payloadSchema,
    definitions
  };
}

let _ajv: Ajv | undefined;
function getAjvInstance(): Ajv {
  if (_ajv) {
    return _ajv;
  }

  _ajv = new Ajv({
    allErrors: true,
    meta: true,
    messages: true,
    strict: false,
    allowUnionTypes: true,
    unicodeRegExp: false,
  });

  addFormats(_ajv);
  ajvErrors(_ajv);

  return _ajv;
}
