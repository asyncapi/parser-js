import { JSONPath } from 'jsonpath-plus';

import { xParserOriginalTraits } from '../constants';
import { mergePatch } from '../utils';

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

export function applyTraitsV2(asyncapi: Record<string, unknown>) {
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

export function applyTraitsV3(asyncapi: Record<string, unknown>) {
  applyAllTraits(asyncapi, v3TraitPaths);
}

function applyAllTraits(asyncapi: Record<string, unknown>, paths: string[]) {
  paths.forEach(path => {
    JSONPath({
      path,
      json: asyncapi,
      resultType: 'value',
      callback(value) { applyTraits(value); },
    });
  });
}

function applyTraits(value: Record<string, unknown>) {
  if (Array.isArray(value.traits)) {
    for (const trait of value.traits) {
      for (const key in trait) {
        value[String(key)] = mergePatch(value[String(key)], trait[String(key)]);
      }
    }

    value[xParserOriginalTraits] = value.traits;
    delete value.traits;
  }
}
