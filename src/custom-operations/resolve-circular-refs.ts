import { setExtension, toJSONPathArray, retrieveDeepData, findSubArrayIndex } from '../utils';
import { xParserCircular } from '../constants';

import type { RulesetFunctionContext } from '@stoplight/spectral-core';
import type { AsyncAPIDocumentInterface } from '../models';
import type { AsyncAPIObject } from '../types';

interface Context { 
  document: AsyncAPIObject;
  hasCircular: boolean;
  inventory: RulesetFunctionContext['documentInventory'];
  visited: Set<any>;
}

export function resolveCircularRefs(document: AsyncAPIDocumentInterface, inventory: RulesetFunctionContext['documentInventory']) {
  const documentJson = document.json();
  const ctx: Context = { document: documentJson, hasCircular: false, inventory, visited: new Set() };
  traverse(documentJson, [], null, '', ctx);
  if (ctx.hasCircular) {
    setExtension(xParserCircular, true, document);
  }
}

function traverse(data: any, path: Array<string | number>, parent: any, property: string | number, ctx: Context) {
  if (typeof data !== 'object' || !data || ctx.visited.has(data)) {
    return;
  }

  ctx.visited.add(data);
  if (Array.isArray(data)) {
    data.forEach((item, idx) => traverse(item, [...path, idx], data, idx, ctx));
  }
  if ('$ref' in data) {
    ctx.hasCircular = true;
    const resolvedRef = retrieveCircularRef(data, path, ctx);
    if (resolvedRef) {
      parent[property] = resolvedRef;
    }
  } else {
    for (const p in data) {
      traverse(data[p], [...path, p], data, p, ctx);
    }
  }
  ctx.visited.delete(data);
}

function retrieveCircularRef(data: { $ref: string }, path: Array<string | number>, ctx: Context): any {
  const $refPath = toJSONPathArray(data.$ref);
  const item = ctx.inventory.findAssociatedItemForPath(path, true);

  // root document case
  if (item === null) {
    return retrieveDeepData(ctx.document, $refPath);
  }
  
  // referenced document case
  if (item) {
    const subArrayIndex = findSubArrayIndex(path, $refPath);
    let dataPath: Array<string | number> | undefined;
    if (subArrayIndex === -1) { // create subarray based on location of the assiociated document - use item.path
      dataPath = [...path.slice(0, path.length - item.path.length), ...$refPath];
    } else { // create subarray based $refPath
      dataPath = path.slice(0, subArrayIndex + $refPath.length);
    }
    return retrieveDeepData(ctx.document, dataPath);
  }
}
