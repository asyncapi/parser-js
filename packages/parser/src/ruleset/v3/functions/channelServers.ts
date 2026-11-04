import { createRulesetFunction } from '@stoplight/spectral-core';
import { isSameFileRef, isUnresolvedRef } from './utils/isSameFileRef';

import type { IFunctionResult } from '@stoplight/spectral-core';

/**
 * Servers of a channel under the root "channels" object must be objects from the
 * root "servers" object of this document. Runs on the resolved document, so it
 * also catches channels and servers that come from another file.
 */
export const v3ChannelServers = createRulesetFunction<
  { servers?: Record<string, unknown>; channels?: Record<string, { servers?: Array<unknown> }> },
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
        },
      },
    },
    options: null,
  },
  (targetVal, _, ctx) => {
    const results: IFunctionResult[] = [];
    const rootServers = Object.values(targetVal.servers ?? {});

    Object.entries(targetVal.channels ?? {}).forEach(([channelName, channel]) => {
      if (!Array.isArray(channel?.servers)) return;

      channel.servers.forEach((server, index) => {
        const path = ['channels', channelName, 'servers', index];
        if (rootServers.includes(server) || isUnresolvedRef(server) || isSameFileRef(ctx.document.data, path)) return;

        results.push({
          message: 'Channel contains server that are not defined on the "servers" object.',
          path,
        });
      });
    });

    return results;
  },
);
