import { SchemaParser, ParseSchemaInput, ValidateSchemaInput } from "../schema-parser";
import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import type { AsyncAPISchema, SchemaValidateResult } from '../types';
// @ts-ignore
import specs from '@asyncapi/specs';

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});

const specVersions = Object.keys(specs).filter((version: string) => !['1.0.0', '1.1.0', '1.2.0', '2.0.0-rc1', '2.0.0-rc2'].includes(version));

export function AsyncAPISchemaParser(): SchemaParser {
  return {
    validate,
    parse,
    getMimeTypes,
  }
}

async function validate(input: ValidateSchemaInput<unknown, unknown>): Promise<SchemaValidateResult[]> {
  const version = input.asyncapi.semver.version
  const validator = findSchemaValidator(version);

  let result: SchemaValidateResult[] = []
  const valid = validator(input.data);
  if (!valid && validator.errors) {
    result = ajvToSpectralResult(validator.errors, input.path);
  }

  return result;
}

function ajvToSpectralResult(errors: ErrorObject[], parentPath: Array<string | number>): SchemaValidateResult[] {
  if (parentPath === undefined) {
    parentPath = [];
  }

  return errors.map(error => {
    const errorPath = error.instancePath.replace(/^\//, '').split('/'); // TODO: Instance Path or Schema Path?

    return {
      message: error.message,
      path: parentPath.concat(errorPath),
    } as SchemaValidateResult;
  });
}

function findSchemaValidator(version: string): ValidateFunction {
  let validator = ajv.getSchema(version);
  if (!validator) {
    const schema = preparePayloadSchema2(specs[version], version);

    ajv.addSchema(schema, version);
    validator = ajv.getSchema(version);
  }

  return validator as ValidateFunction;
}

async function parse(input: ParseSchemaInput<unknown, unknown>): Promise<AsyncAPISchema> {
  return input.data as AsyncAPISchema;
}

/**
 * To validate schema of the payload we just need a small portion of official AsyncAPI spec JSON Schema, the definition of the schema must be
 * a main part of the JSON Schema
 * 
 * @private
 * @param {Object} asyncapiSchema AsyncAPI specification JSON Schema
 * @param {Object} version AsyncAPI version.
 * @returns {Object} valid JSON Schema document describing format of AsyncAPI-valid schema for message payload
 */
function preparePayloadSchema2(asyncapiSchema: AsyncAPISchema, version: string) {
  const payloadSchema = `http://asyncapi.com/definitions/${version}/schema.json`;
  const definitions = asyncapiSchema.definitions;
  if (definitions === undefined) {
    throw new Error("AsyncAPI schema must contain definitions");
  }

  // Remove the meta schemas because it is already present within Ajv, and it's not possible to add duplicate schemas.
  delete definitions['http://json-schema.org/draft-07/schema'];
  delete definitions['http://json-schema.org/draft-04/schema'];
  return {
    $ref: payloadSchema,
    definitions
  };
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
