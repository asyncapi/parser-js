import specs from '@asyncapi/specs';
import { createRulesetFunction } from '@stoplight/spectral-core';
import { schema as schemaFn } from '@stoplight/spectral-functions';
import { aas2_0, aas2_1, aas2_2, aas2_3, aas2_4, aas2_5, aas2_6 } from '../formats';

// import type { ErrorObject } from 'ajv';
import type { IFunctionResult, Format } from '@stoplight/spectral-core';

type AsyncAPIVersions = keyof typeof specs;

function getCopyOfSchema(version: AsyncAPIVersions): Record<string, unknown> {
  return JSON.parse(JSON.stringify(specs[version])) as Record<string, unknown>;
}

const serializedSchemas = new Map<AsyncAPIVersions, Record<string, unknown>>();
function getSerializedSchema(version: AsyncAPIVersions): Record<string, unknown> {
  const schema = serializedSchemas.get(version);
  if (schema) {
    return schema;
  }

  // Copy to not operate on the original json schema - between imports (in different modules) we operate on this same schema.
  const copied = getCopyOfSchema(version) as { definitions: Record<string, unknown> };
  // Remove the meta schemas because they are already present within Ajv, and it's not possible to add duplicated schemas.
  delete copied.definitions['http://json-schema.org/draft-07/schema'];
  delete copied.definitions['http://json-schema.org/draft-04/schema'];

  serializedSchemas.set(version, copied);
  return copied;
}

const refErrorMessage = 'Property "$ref" is not expected to be here';
function filterRefErrors(errors: IFunctionResult[], resolved: boolean) {
  if (resolved) {
    return errors.filter(err => err.message !== refErrorMessage);
  }

  return errors
    .filter(err => err.message === refErrorMessage)
    .map(err => {
      err.message = 'Referencing in this place is not allowed';
      return err;
    });
}

function getSchema(formats: Set<Format>): Record<string, any> | void {
  switch (true) {
  case formats.has(aas2_6):
    return getSerializedSchema('2.6.0');
  case formats.has(aas2_5):
    return getSerializedSchema('2.5.0');
  case formats.has(aas2_4):
    return getSerializedSchema('2.4.0');
  case formats.has(aas2_3):
    return getSerializedSchema('2.3.0');
  case formats.has(aas2_2):
    return getSerializedSchema('2.2.0');
  case formats.has(aas2_1):
    return getSerializedSchema('2.1.0');
  case formats.has(aas2_0):
    return getSerializedSchema('2.0.0');
  default:
    return;
  }
}

export const documentStructure = createRulesetFunction<unknown, { resolved: boolean }>(
  {
    input: null,
    options: {
      type: 'object',
      properties: {
        resolved: {
          type: 'boolean',
        },
      },
      required: ['resolved'],
    },
  },
  (targetVal, options, context) => {
    const formats = context.document?.formats;
    if (!formats) {
      return;
    }

    const schema = getSchema(formats);
    if (!schema) {
      return;
    }

    const errors = schemaFn(targetVal, { allErrors: true, schema }, context);
    if (!Array.isArray(errors)) {
      return;
    }

    return filterRefErrors(errors, options.resolved);
  },
);