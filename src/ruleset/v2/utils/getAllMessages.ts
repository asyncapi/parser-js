import { isObject } from '../../../utils';

import { getAllOperations } from './getAllOperations';

import type { JsonPath } from '@stoplight/types';
import type { v2 } from '../../../spec-types';

export type GetAllMessageResult = { path: JsonPath; message: v2.MessageObject };

export function* getAllMessages(asyncapi: v2.AsyncAPIObject): IterableIterator<GetAllMessageResult> {
  for (const { path, operation } of getAllOperations(asyncapi)) {
    if (!isObject(operation)) {
      continue;
    }

    const maybeMessage = operation.message;
    if (!isObject(maybeMessage)) {
      continue;
    }

    const oneOf = (maybeMessage as { oneOf: Array<v2.MessageObject> }).oneOf;
    if (Array.isArray(oneOf)) {
      for (const [index, message] of oneOf.entries()) {
        if (isObject(message)) {
          yield {
            path: [...path, 'message', 'oneOf', index],
            message,
          };
        }
      }
    } else {
      yield {
        path: [...path, 'message'],
        message: maybeMessage as v2.MessageObject,
      };
    }
  }
}