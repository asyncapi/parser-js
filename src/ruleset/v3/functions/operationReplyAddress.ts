import { createRulesetFunction } from '@stoplight/spectral-core';

import { hasRef, isObject, retrieveDeepData, toJSONPathArray } from '../../../utils';

type OperationReply = {
  address?: unknown;
  channel?: unknown;
};

function resolveLocalReference(document: Record<string, unknown>, value: unknown): unknown {
  const visited = new Set<string>();

  while (hasRef(value) && value.$ref.startsWith('#/') && !visited.has(value.$ref)) {
    visited.add(value.$ref);
    value = retrieveDeepData(document, toJSONPathArray(value.$ref));
  }

  return value;
}

export const operationReplyAddress = createRulesetFunction<OperationReply, null>(
  {
    input: {
      type: 'object',
      properties: {
        address: {
          type: 'object',
        },
        channel: {
          type: 'object',
        },
      },
    },
    options: null,
  },
  (targetVal, _, ctx) => {
    if (targetVal.address === undefined || !hasRef(targetVal.channel)) {
      return;
    }

    const channel = resolveLocalReference(
      ctx.document.data as Record<string, unknown>,
      targetVal.channel,
    );
    if (!isObject(channel) || channel.address === undefined || channel.address === null) {
      return;
    }

    return [{
      message: 'A channel referenced by a reply with a dynamic address must have a null or undefined "address".',
      path: [...ctx.path, 'channel'],
    }];
  },
);
