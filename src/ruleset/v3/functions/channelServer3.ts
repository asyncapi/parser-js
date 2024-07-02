import { createRulesetFunction } from '@stoplight/spectral-core';
import type { IFunctionResult } from '@stoplight/spectral-core';

export const channelServers3 = createRulesetFunction<
  { servers?: Record<string, unknown>; channels?: Record<string, { servers?: Array<{ $ref: string }> }> },
  null
>(
  {
    input: {
      type: 'object',
      properties: {
        servers: {
          type: 'object',
        },
        channels: {
          type: 'object',
          additionalProperties: {
            type: 'object',
            properties: {
              servers: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['$ref'],
                  properties: {
                    $ref: { type: 'string' },
                  },
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
    console.log('channelServers function called with:', JSON.stringify(targetVal, null, 2));
    const results: IFunctionResult[] = [];
    if (!targetVal.channels) return results;

    Object.entries(targetVal.channels ?? {}).forEach(([channelAddress, channel]) => {
      if (!channel.servers) return;

      channel.servers.forEach((serverRef, index) => {
        if (!serverRef.$ref.startsWith('#/servers/')) {
          results.push({
            message: 'Channel server must reference a server defined in the root "servers" object.',
            path: ['channels', channelAddress, 'servers', index, '$ref'],
          });
        }
      });
    });
    console.log('channelServers function returning results:', results);
    return results;
  },
);