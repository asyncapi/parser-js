import { SchemaParser, ParseSchemaInput, ValidateSchemaInput } from "../schema-parser";
import Ajv from "ajv";
import { JSONSchema7 } from "json-schema"
import type { AsyncAPISchema, SchemaValidateError } from '../types';

const ajv = new Ajv({
  allErrors: true,
})

export function AsyncAPISchemaParser(): SchemaParser {
  return {
    validate,
    parse,
    getMimeTypes,
  }
}

async function validate(input: ValidateSchemaInput<unknown, unknown>): Promise<SchemaValidateError[]> {
  const schema = input.data as JSONSchema7;
  let errors: SchemaValidateError[] = [];

  try {
    ajv.compile(schema);
  } catch (error: any) {
    if (error! instanceof Error) {
      errors = AjvToSpectralErrors(error);
    } else {
      // Unknown and unexpected error
      throw error;
    }
  }

  return errors;
}

function AjvToSpectralErrors(error: Error): SchemaValidateError[] {
  let errors: SchemaValidateError[] = [];
  let errorMessage = error.message;

  // Validation errors
  const validationErrorPrefix = "schema is invalid: ";
  if (error.message.startsWith(validationErrorPrefix)) {
    // remove prefix
    errorMessage = errorMessage.substring(validationErrorPrefix.length);

    // message can contain multiple validation errors separated by ',' (comma)
    errorMessage.split(", ").forEach((message: string) => {
      const path = message.slice(0, message.indexOf(" "));
      const error = message.slice(message.indexOf(" ") + 1);
      const resultErr: SchemaValidateError = {
        message: error,
        path: path.split("/")
      };
      errors.push(resultErr);
    });
  } else {
    // Not a validation error
    const resultErr: SchemaValidateError = {
      message: error.message,
    };
    errors.push(resultErr);
  }

  return errors;
}

async function parse(input: ParseSchemaInput<unknown, unknown>): Promise<AsyncAPISchema> {
  return input.data as JSONSchema7;
}

function getMimeTypes() {
  const mimeTypes = [
    'application/schema;version=draft-07',
    'application/schema+json;version=draft-07',
    'application/schema+yaml;version=draft-07',
  ];
  ['2.0.0', '2.1.0', '2.2.0', '2.3.0'].forEach(version => {
    mimeTypes.push(
      `application/vnd.aai.asyncapi;version=${version}`,
      `application/vnd.aai.asyncapi+json;version=${version}`,
      `application/vnd.aai.asyncapi+yaml;version=${version}`,
    );
  });
  return mimeTypes;
}
