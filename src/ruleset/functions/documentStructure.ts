import specs from '@asyncapi/specs';
import { createRulesetFunction } from '@stoplight/spectral-core';
import { schema as schemaFn } from '@stoplight/spectral-functions';

import type { ErrorObject } from 'ajv';
import type { IFunctionResult, Format } from '@stoplight/spectral-core';
import { AsyncAPIFormats } from '../formats';
import { getSemver } from '../../utils';

type AsyncAPIVersions = keyof typeof specs.schemas;
type RawSchema = Record<string, unknown>;

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

function getCopyOfSchema(version: AsyncAPIVersions): RawSchema {
  return JSON.parse(JSON.stringify(specs.schemas[version])) as RawSchema;
}

const serializedSchemas = new Map<AsyncAPIVersions, RawSchema>();
function getSerializedSchema(version: AsyncAPIVersions, options: options): RawSchema {
  const serializedSchemaKey = options.resolved ? `${version}-resolved` : `${version}-unresolved`;
  const schema = serializedSchemas.get(serializedSchemaKey as AsyncAPIVersions);
  if (schema) {
    return schema;
  }

  // Copy to not operate on the original json schema - between imports (in different modules) we operate on this same schema.
  const copied = getCopyOfSchema(version) as { definitions: RawSchema };
  // Remove the meta schemas because they are already present within Ajv, and it's not possible to add duplicated schemas.
  delete copied.definitions['http://json-schema.org/draft-07/schema'];
  delete copied.definitions['http://json-schema.org/draft-04/schema'];

  if (options.schemaTransformers) {
    const majorVersion = getSemver(version).major;
    const transformer = options.schemaTransformers[version] || options.schemaTransformers[majorVersion] || options.schemaTransformers[String(majorVersion)];
    if (transformer) {
      transformer(copied);
    }
  }

  serializedSchemas.set(serializedSchemaKey as AsyncAPIVersions, copied);
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
type SchemaTransformers = Record<string, (schema: RawSchema) => void>

export function getSchema(docFormats: Set<Format>, options: options): Record<string, any> | void {
  for (const [version, format] of AsyncAPIFormats) {
    if (docFormats.has(format)) {
      return getSerializedSchema(version as AsyncAPIVersions, options);
    }
  }
}

type options = { resolved: boolean, schemaTransformers: SchemaTransformers};

export const documentStructure = createRulesetFunction<unknown, options>(
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

    const schema = getSchema(formats, options);
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
