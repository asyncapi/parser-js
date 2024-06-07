import { isObject } from '../../../utils';

import type { JsonPath } from '@stoplight/types';
import type { v2 } from '../../../spec-types';

export type GetAllOperationsResult = { path: JsonPath; kind: 'subscribe' | 'publish'; operation: v2.OperationObject };

export function* getAllOperations(asyncapi: v2.AsyncAPIObject): IterableIterator<GetAllOperationsResult> {
  const channels = asyncapi?.channels;
  if (!isObject(channels)) {
    return {};
  }

  for (const [channelAddress, channel] of Object.entries(channels)) {
    if (!isObject(channel)) {
      continue;
    }

    if (isObject(channel.subscribe)) {
      yield {
        path: ['channels', channelAddress, 'subscribe'],
        kind: 'subscribe',
        operation: channel.subscribe,
      };
    }
    if (isObject(channel.publish)) {
      yield {
        path: ['channels', channelAddress, 'publish'],
        kind: 'publish',
        operation: channel.publish,
      };
    }
  }
}