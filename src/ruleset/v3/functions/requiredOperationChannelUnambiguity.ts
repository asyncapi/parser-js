import { createRulesetFunction } from '@stoplight/spectral-core';
import type { IFunctionResult } from '@stoplight/spectral-core';
import { SchemaDefinition } from '@stoplight/spectral-core/dist/ruleset/function';

const referenceSchema: SchemaDefinition = {
  type: 'object',
  properties: {
    $ref: {
      type: 'string',
      format: 'uri-reference'
    },
  },
};

export const requiredOperationChannelUnambiguity = createRulesetFunction<{ channel?: {'$ref': string}; messages?: [{'$ref': string}] }, null>(
  {
    input: {
      type: 'object',
      properties: {
        channel: referenceSchema,
        messages: {
          type: 'array',
          items: referenceSchema,
        },
      },
    },
    options: null,
  },
  (targetVal, _, ctx) => {
    const results: IFunctionResult[] = [];
    const channelPointer = targetVal.channel?.$ref as string; // required

    if (!channelPointer.includes('#/channels/')) {
      results.push({
        message: 'The channel field of a required operation should point to a required channel.',
        path: [...ctx.path, 'channel'],
      });
    }

    return results;
  },
);
