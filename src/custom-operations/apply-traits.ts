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
  applyAllTraits(asyncapi, v2TraitPaths);
}

const v3TraitPaths = [
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

export function applyTraitsV3(asyncapi: v3.AsyncAPIObject) {
  applyAllTraits(asyncapi, v3TraitPaths);
}

function applyAllTraits(asyncapi: Record<string, any>, paths: string[]) {
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
        applyTraits(value);
      },
    });
  });
}

function applyTraits(value: Record<string, unknown> & { traits?: any[] }) {
  if (Array.isArray(value.traits)) {
    for (const trait of value.traits) {
      for (const key in trait) {
        value[String(key)] = mergePatch(value[String(key)], trait[String(key)]);
      }
    }
  }
}
