import { createRulesetFunction } from '@stoplight/spectral-core';
import { isSameFileRef, isUnresolvedRef } from './utils/isSameFileRef';

import type { IFunctionResult } from '@stoplight/spectral-core';

/**
 * The channel of an operation under the root "operations" object must be an object
 * from the root "channels" object of this document. Runs on the resolved document,
 * so it also catches operations and channels that come from another file.
 */
export const v3OperationChannel = createRulesetFunction<
  { channels?: Record<string, unknown>; operations?: Record<string, { channel?: unknown }> },
  null
>(
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
  (targetVal, _, ctx) => {
    const results: IFunctionResult[] = [];
    const rootChannels = Object.values(targetVal.channels ?? {});

    Object.entries(targetVal.operations ?? {}).forEach(([operationName, operation]) => {
      const channel = operation?.channel;
      if (channel === undefined) return;

      const path = ['operations', operationName, 'channel'];
      if (rootChannels.includes(channel) || isUnresolvedRef(channel) || isSameFileRef(ctx.document.data, path)) return;

      results.push({
        message: 'Operation channel is not defined on the "channels" object.',
        path,
      });
    });

    return results;
  },
);
