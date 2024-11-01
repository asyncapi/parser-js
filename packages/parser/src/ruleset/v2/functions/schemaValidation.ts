import { createRulesetFunction, IFunctionResult } from '@stoplight/spectral-core';
import { schema as schemaFn } from '@stoplight/spectral-functions';

import type { JsonPath } from '@stoplight/types';

type SchemaFragment = {
  default?: unknown;
  examples?: unknown[];
};

function getRelevantItems(target: SchemaFragment, type: 'default' | 'examples'): { path: JsonPath; value: unknown }[] {
  if (type === 'default') {
    return [{ path: ['default'], value: target.default }];
  }

  if (!Array.isArray(target.examples)) {
    return [];
  }

  return Array.from<[number, unknown]>(target.examples.entries()).map(([key, value]) => ({
    path: ['examples', key],
    value,
  }));
}

export const schemaValidation = createRulesetFunction<SchemaFragment, { type: 'default' | 'examples' }>(
  {
    input: {
      type: 'object',
      properties: {
        default: {},
        examples: {
          type: 'array',
        },
      },
      errorMessage: '#{{print("property")}must be an object containing "default" or an "examples" array',
    },
    errorOnInvalidInput: true,
    options: {
      type: 'object',
      properties: {
        type: {
          enum: ['default', 'examples'],
        },
      },
      additionalProperties: false,
      required: ['type'],
    },
  },
  (targetVal, opts, context) => {
    const schemaObject = targetVal;

    const results: IFunctionResult[] = [];
    for (const relevantItem of getRelevantItems(targetVal, opts.type)) {
      const result = schemaFn(
        relevantItem.value,
        {
          schema: schemaObject,
          allErrors: true,
        },
        {
          ...context,
          path: [...context.path, ...relevantItem.path],
        },
      );

      if (Array.isArray(result) && typeof relevantItem.value !== 'string') {
        results.push(...result);
      }
    }
    return results;
  },
);