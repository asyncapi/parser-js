import { createRulesetFunction } from '@stoplight/spectral-core';
import type { IFunctionResult } from '@stoplight/spectral-core';

type ChannelObject = Record<string, unknown>;
type OperationObject = {
  channel?: ChannelObject;
  [key: string]: unknown;
};
type AsyncAPIDocument = {
  channels?: Record<string, ChannelObject>;
  operations?: Record<string, OperationObject>;
  [key: string]: unknown;
};

/**
 * This function validates that operations under the root "operations" object
 * reference channels that are defined in the root "channels" object.
 * 
 * This validation runs on the RESOLVED document, meaning all $refs have been
 * dereferenced. This is necessary to catch cases where an external file's
 * channel is referenced, and that channel points to components instead of root channels.
 */
export const requiredOperationChannelUnambiguity = createRulesetFunction<AsyncAPIDocument, null>(
  {
    input: {
      type: 'object',
      properties: {
        channels: {
          type: 'object',
        },
        operations: {
          type: 'object',
        },
      },
    },
    options: null,
  },
  (targetVal) => {
    const results: IFunctionResult[] = [];
    
    if (!targetVal.operations) {
      return results;
    }

    const rootChannels = targetVal.channels ?? {};
    const rootChannelValues = Object.values(rootChannels);

    Object.entries(targetVal.operations).forEach(([operationName, operation]) => {
      if (!operation.channel) {
        return;
      }

      // After resolution, operation.channel should be the actual channel object
      // We need to check if this resolved channel object is one of the root channels
      const resolvedChannel = operation.channel;

      // Check if the resolved channel is actually one of the root channels
      // by comparing object references (after resolution, they should be the same object)
      const isRootChannel = rootChannelValues.some(
        (rootChannel) => rootChannel === resolvedChannel
      );

      if (!isRootChannel) {
        results.push({
          message: 'Operation references a channel that is not defined in the root "channels" object.',
          path: ['operations', operationName, 'channel'],
        });
      }
    });

    return results;
  },
);
