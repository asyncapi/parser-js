import { createRulesetFunction } from '@stoplight/spectral-core';
import { schema as schemaFn } from '@stoplight/spectral-functions';

import type { JsonPath } from '@stoplight/types';
import type { IFunctionResult, RulesetFunctionContext } from '@stoplight/spectral-core';
import type { JSONSchema7 } from 'json-schema';
import type { v2 } from 'spec-types';

function getMessageExamples(message: v2.MessageObject): Array<{ path: JsonPath; value: v2.MessageExampleObject }> {
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

function validate(
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
    for (const example of getMessageExamples(targetVal)) {
      // validate payload
      if (example.value.payload !== undefined) {
        const errors = validate(example.value.payload, example.path, 'payload', targetVal.payload, ctx);
        if (Array.isArray(errors)) {
          results.push(...errors);
        }
      }

      // validate headers
      if (example.value.headers !== undefined) {
        const errors = validate(example.value.headers, example.path, 'headers', targetVal.headers, ctx);
        if (Array.isArray(errors)) {
          results.push(...errors);
        }
      }
    }
    return results;
  },
);