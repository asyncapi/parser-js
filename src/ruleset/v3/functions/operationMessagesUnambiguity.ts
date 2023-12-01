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

export const operationMessagesUnambiguity = createRulesetFunction<{ channel?: {'$ref': string}; messages?: [{'$ref': string}] }, null>(
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

    targetVal.messages?.forEach((message, index) => {      
      if (!message.$ref.startsWith(`${channelPointer}/messages`)) {
        results.push({
          message: 'Operation message does not belong to the specified channel.',
          path: [...ctx.path, 'messages', index],
        });
      }
    });
  
    return results;
  },
);
