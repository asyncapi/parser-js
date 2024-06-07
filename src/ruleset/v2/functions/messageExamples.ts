import { createRulesetFunction } from '@stoplight/spectral-core';
import { schema as schemaFn } from '@stoplight/spectral-functions';

import type { JsonPath } from '@stoplight/types';
import type { IFunctionResult, RulesetFunctionContext } from '@stoplight/spectral-core';
import type { JSONSchema7 } from 'json-schema';
import type { v2 } from 'spec-types';

function serializeSchema(schema: unknown, type: 'payload' | 'headers'): any {
  if (!schema && typeof schema !== 'boolean') { // if schema is falsy then
    if (type === 'headers') { // object for headers
      schema = { type: 'object' };
    } else { // anything for payload
      schema = {};
    }
  } else if (typeof schema === 'boolean') { // spectral cannot handle boolean schemas
    if (schema === true) {
      schema = {}; // everything
    } else {
      schema = { not: {} }; // nothing
    }
  }
  return schema;
}

export function getMessageExamples(message: v2.MessageObject): Array<{ path: JsonPath; value: v2.MessageExampleObject }> {
  if (!Array.isArray(message.examples)) {
    return [];
  }
  return (
    message.examples.map((example, index) => {
      return {
        path: ['examples', index],
        value: example,
      };
    }) ?? []
  );
}

export function validate(
  value: unknown,
  path: JsonPath,
  type: 'payload' | 'headers',
  schema: unknown,
  ctx: RulesetFunctionContext,
): ReturnType<typeof schemaFn> {
  return schemaFn(
    value,
    {
      allErrors: true,
      schema: schema as JSONSchema7,
    },
    {
      ...ctx,
      path: [...ctx.path, ...path, type],
    },
  );
}

export const messageExamples = createRulesetFunction<v2.MessageObject, null>(
  {
    input: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        summary: {
          type: 'string',
        },
      },
    },
    options: null,
  },
  (targetVal, _, ctx) => {
    if (!targetVal.examples) return;

    const results: IFunctionResult[] = [];
    const payloadSchema = serializeSchema(targetVal.payload, 'payload');
    const headersSchema = serializeSchema(targetVal.headers, 'headers');
    for (const example of getMessageExamples(targetVal)) {
      const { path, value } = example;

      // validate payload
      if (value.payload !== undefined) {
        const errors = validate(value.payload, path, 'payload', payloadSchema, ctx);
        if (Array.isArray(errors)) {
          results.push(...errors);
        }
      }

      // validate headers
      if (value.headers !== undefined) {
        const errors = validate(value.headers, path, 'headers', headersSchema, ctx);
        if (Array.isArray(errors)) {
          results.push(...errors);
        }
      }
    }
    return results;
  },
);