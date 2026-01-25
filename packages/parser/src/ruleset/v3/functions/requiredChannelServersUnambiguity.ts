import { createRulesetFunction } from '@stoplight/spectral-core';
import type { IFunctionResult } from '@stoplight/spectral-core';

type ServerObject = Record<string, unknown>;
type ChannelObject = {
  servers?: ServerObject[];
  [key: string]: unknown;
};
type AsyncAPIDocument = {
  servers?: Record<string, ServerObject>;
  channels?: Record<string, ChannelObject>;
  [key: string]: unknown;
};

/**
 * This function validates that channels under the root "channels" object
 * reference servers that are defined in the root "servers" object.
 * 
 * This validation runs on the RESOLVED document, meaning all $refs have been
 * dereferenced. This is necessary to catch cases where an external file's
 * channel is referenced, and that channel has servers pointing to components
 * instead of root servers.
 */
export const requiredChannelServersUnambiguity = createRulesetFunction<AsyncAPIDocument, null>(
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
  (targetVal) => {
    const results: IFunctionResult[] = [];
    
    if (!targetVal.channels) {
      return results;
    }

    const rootServers = targetVal.servers ?? {};
    const rootServerValues = Object.values(rootServers);

    Object.entries(targetVal.channels).forEach(([channelName, channel]) => {
      if (!channel.servers || !Array.isArray(channel.servers)) {
        return;
      }

      channel.servers.forEach((server, index) => {
        // After resolution, each server in the array should be the actual server object
        // We need to check if this resolved server object is one of the root servers
        // by comparing object references (after resolution, they should be the same object)
        const isRootServer = rootServerValues.some(
          (rootServer) => rootServer === server
        );

        if (!isRootServer) {
          results.push({
            message: 'Channel references a server that is not defined in the root "servers" object.',
            path: ['channels', channelName, 'servers', index],
          });
        }
      });
    });

    return results;
  },
);
