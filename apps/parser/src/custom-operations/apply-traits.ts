import { JSONPath } from 'jsonpath-plus';

import { mergePatch } from '../utils';

import type { v2, v3 } from '../spec-types';

const v2TraitPaths = [
  // operations
  '$.channels.*.[publish,subscribe]',
  '$.components.channels.*.[publish,subscribe]',
  // messages
  '$.channels.*.[publish,subscribe].message',
  '$.channels.*.[publish,subscribe].message.oneOf.*',
  '$.components.channels.*.[publish,subscribe].message',
  '$.components.channels.*.[publish,subscribe].message.oneOf.*',
  '$.components.messages.*',
];

export function applyTraitsV2(asyncapi: v2.AsyncAPIObject) {
  applyAllTraitsV2(asyncapi, v2TraitPaths);
}

function applyAllTraitsV2(asyncapi: Record<string, any>, paths: string[]) {
  const visited: Set<unknown> = new Set();
  paths.forEach(path => {
    JSONPath({
      path,
      json: asyncapi,
      resultType: 'value',
      callback(value) {
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
        applyTraitsToObjectV2(value);
      },
    });
  });
}

function applyTraitsToObjectV2(value: Record<string, unknown>) {
  if (Array.isArray(value.traits)) {
    for (const trait of value.traits) {
      for (const key in trait) {
        value[String(key)] = mergePatch(value[String(key)], trait[String(key)]);
      }
    }
  }
}

const v3TraitPaths = [
  // operations
  '$.operations.*',
  '$.operations.*.channel.*',
  '$.operations.*.channel.messages.*',
  '$.operations.*.messages.*',
  '$.components.operations.*',
  '$.components.operations.*.channel.*',
  '$.components.operations.*.channel.messages.*',
  '$.components.operations.*.messages.*',
  // Channels
  '$.channels.*.messages.*',
  '$.components.channels.*.messages.*',
  // messages
  '$.components.messages.*',
];

export function applyTraitsV3(asyncapi: v3.AsyncAPIObject) {
  applyAllTraitsV3(asyncapi, v3TraitPaths);
}

function applyAllTraitsV3(asyncapi: Record<string, any>, paths: string[]) {
  const visited: Set<unknown> = new Set();
  paths.forEach(path => {
    JSONPath({
      path,
      json: asyncapi,
      resultType: 'value',
      callback(value) {
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
        applyTraitsToObjectV3(value);
      },
    });
  });
}

function applyTraitsToObjectV3(value: Record<string, unknown>) {
  if (!Array.isArray(value.traits)) {
    return;
  }

  // shallow copy of object
  const copy = { ...value };
  // reset the object but preserve the reference
  for (const key in value) {
    delete value[key];
  }

  // merge root object at the end
  for (const trait of [...copy.traits as any[], copy]) {
    for (const key in trait) {
      value[String(key)] = mergePatch(value[String(key)], trait[String(key)]);
    }
  }
}
