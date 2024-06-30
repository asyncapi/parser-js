import { createRulesetFunction } from '@stoplight/spectral-core';

import { getAllMessages } from '../utils';
import { isObject } from '../../../utils';

import type { IFunctionResult } from '@stoplight/spectral-core';
import type { JsonPath } from '@stoplight/types';
import type { v2 } from '../../../spec-types';

function retrieveMessageId(message: v2.MessageObject): { messageId: string; path: JsonPath } | undefined {
  if (Array.isArray(message.traits)) {
    for (let i = message.traits.length - 1; i >= 0; i--) {
      const trait = message.traits[i] as v2.MessageTraitObject;
      if (isObject(trait) && typeof trait.messageId === 'string') {
        return {
          messageId: trait.messageId,
          path: ['traits', i, 'messageId'],
        };
      }
    }
  }

  if (typeof message.messageId === 'string') {
    return {
      messageId: message.messageId,
      path: ['messageId'],
    };
  }

  return undefined;
}

export const messageIdUniqueness = createRulesetFunction<v2.AsyncAPIObject, null>(
  {
    input: {
      type: 'object',
      properties: {
        channels: {
          type: 'object',
          properties: {
            subscribe: {
              type: 'object',
              properties: {
                message: {
                  oneOf: [
                    { type: 'object' },
                    {
                      type: 'object',
                      properties: {
                        oneOf: {
                          type: 'array',
                        },
                      },
                    },
                  ],
                },
              },
            },
            publish: {
              type: 'object',
              properties: {
                message: {
                  oneOf: [
                    { type: 'object' },
                    {
                      type: 'object',
                      properties: {
                        oneOf: {
                          type: 'array',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    options: null,
  },
  (targetVal) => {
    const results: IFunctionResult[] = [];
    const messages = getAllMessages(targetVal);

    const seenIds: unknown[] = [];
    for (const { path, message } of messages) {
      const maybeMessageId = retrieveMessageId(message);
      if (maybeMessageId === undefined) {
        continue;
      }

      if (seenIds.includes(maybeMessageId.messageId)) {
        results.push({
          message: '"messageId" must be unique across all the messages.',
          path: [...path, ...maybeMessageId.path],
        });
      } else {
        seenIds.push(maybeMessageId.messageId);
      }
    }

    return results;
  },
);