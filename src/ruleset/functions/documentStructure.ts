import specs from '@asyncapi/specs';
import { createRulesetFunction } from '@stoplight/spectral-core';
import { schema as schemaFn } from '@stoplight/spectral-functions';
import { aas2_0, aas2_1, aas2_2, aas2_3, aas2_4, aas2_5, aas2_6 } from '../formats';

import type { ErrorObject } from 'ajv';
import type { IFunctionResult, Format } from '@stoplight/spectral-core';

type AsyncAPIVersions = keyof typeof specs.schemas;

function shouldIgnoreError(error: ErrorObject): boolean {
  return (
    // oneOf is a fairly error as we have 2 options to choose from for most of the time.
    error.keyword === 'oneOf' ||
    // the required $ref is entirely useless, since aas-schema rules operate on resolved content, so there won't be any $refs in the document
    (error.keyword === 'required' && error.params.missingProperty === '$ref')
  );
}

// ajv throws a lot of errors that have no understandable context, e.g. errors related to the fact that a value doesn't meet the conditions of some sub-schema in `oneOf`, `anyOf` etc.
// for this reason, we filter these unnecessary errors and leave only the most important ones (usually the first occurring in the list of errors). 
function prepareResults(errors: ErrorObject[]): void {
  // Update additionalProperties errors to make them more precise and prevent them from being treated as duplicates
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];

    if (error.keyword === 'additionalProperties') {
      error.instancePath = `${error.instancePath}/${String(error.params['additionalProperty'])}`;
    } else if (error.keyword === 'required' && error.params.missingProperty === '$ref') {
      errors.splice(i, 1);
      i--;
    }
  }

  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];

    if (i + 1 < errors.length && errors[i + 1].instancePath === error.instancePath) {
      errors.splice(i + 1, 1);
      i--;
    } else if (i > 0 && shouldIgnoreError(error) && errors[i - 1].instancePath.startsWith(error.instancePath)) {
      errors.splice(i, 1);
      i--;
    }
  }
}

function getCopyOfSchema(version: AsyncAPIVersions): Record<string, unknown> {
  return JSON.parse(JSON.stringify(specs.schemas[version])) as Record<string, unknown>;
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

    const errors = schemaFn(targetVal, { allErrors: true, schema, prepareResults: options.resolved ? prepareResults : undefined }, context);
    if (!Array.isArray(errors)) {
      return;
    }

    return filterRefErrors(errors, options.resolved);
  },
);
