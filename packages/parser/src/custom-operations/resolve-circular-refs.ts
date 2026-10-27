import { setExtension, toJSONPathArray, retrieveDeepData, findSubArrayIndex } from '../utils';
import { xParserCircular } from '../constants';

import type { RulesetFunctionContext } from '@stoplight/spectral-core';
import type { AsyncAPIDocumentInterface } from '../models';
import type { AsyncAPIObject } from '../types';

interface Context { 
  document: AsyncAPIObject;
  hasCircular: boolean;
  inventory: RulesetFunctionContext['documentInventory'];
  active: WeakSet<object>;
  completed: WeakSet<object>;
}

export function resolveCircularRefs(document: AsyncAPIDocumentInterface, inventory: RulesetFunctionContext['documentInventory']) {
  const documentJson = document.json();
  const ctx: Context = {
    document: documentJson,
    hasCircular: false,
    inventory,
    active: new WeakSet(),
    completed: new WeakSet(),
  };
  traverse(documentJson, [], null, '', ctx);
  if (ctx.hasCircular) {
    setExtension(xParserCircular, true, document);
  }
}

function traverse(data: any, path: Array<string | number>, parent: any, property: string | number, ctx: Context): boolean {
  if (typeof data !== 'object' || !data) {
    return true;
  }

  if (ctx.completed.has(data)) {
    return true;
  }

  if (ctx.active.has(data)) {
    return !('$ref' in data);
  }

  if ('$ref' in data) {
    ctx.hasCircular = true;
    ctx.active.add(data);
    const resolvedRef = retrieveCircularRef(data, path, ctx);
    if (resolvedRef) {
      parent[property] = resolvedRef;
      const completed = traverse(resolvedRef, path, parent, property, ctx);
      ctx.active.delete(data);
      return completed;
    }
    ctx.active.delete(data);
    return false;
  }

  ctx.active.add(data);
  let completed = true;
  if (Array.isArray(data)) {
    data.forEach((item, idx) => {
      completed = traverse(item, [...path, idx], data, idx, ctx) && completed;
    });
  } else {
    for (const p in data) {
      completed = traverse(data[p], [...path, p], data, p, ctx) && completed;
    }
  }
  ctx.active.delete(data);
  if (completed) {
    ctx.completed.add(data);
  }
  return completed;
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
    } else { // create subarray based on $refPath
      dataPath = path.slice(0, subArrayIndex + $refPath.length);
    }
    return retrieveDeepData(ctx.document, dataPath);
  }
}
