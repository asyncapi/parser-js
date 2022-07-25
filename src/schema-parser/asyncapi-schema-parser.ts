import { SchemaParser, ParseSchemaInput, ValidateSchemaInput } from "../schema-parser";
import Ajv from "ajv";
import { JSONSchema7 } from "json-schema"
import type { AsyncAPISchema, SchemaValidateResult } from '../types';

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

async function validate(input: ValidateSchemaInput<unknown, unknown>): Promise<SchemaValidateResult[]> {
  const schema = input.data as JSONSchema7;
  let errors: SchemaValidateResult[] = [];

  try {
    ajv.compile(schema);
  } catch (error: any) {
    if (error! instanceof Error) {
      errors = ajvToSpectralErrors(error);
    } else {
      // Unknown and unexpected error
      throw error;
    }
  }

  return errors;
}

function ajvToSpectralErrors(error: Error): SchemaValidateResult[] {
  let errors: SchemaValidateResult[] = [];
  let errorMessage = error.message;

  // Validation errors. 
  // See related AJV function where the error message is generated: 
  // https://github.com/ajv-validator/ajv/blob/99e884dc4bbb828cf47771b7bbdb14f23193b0b1/lib/core.ts#L501-L522
  const validationErrorPrefix = "schema is invalid: ";
  if (error.message.startsWith(validationErrorPrefix)) {
    // remove prefix
    errorMessage = errorMessage.substring(validationErrorPrefix.length);

    // message can contain multiple validation errors separated by ',' (comma)
    errorMessage.split(", ").forEach((message: string) => {
      const splitIndex = message.indexOf(" ");
      const path = message.slice(0, splitIndex);
      const error = message.slice(splitIndex + 1);

      const resultErr: SchemaValidateResult = {
        message: error,
        path: path.split("/")
      };

      errors.push(resultErr);
    });
  } else {
    // Not a validation error
    const resultErr: SchemaValidateResult = {
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
