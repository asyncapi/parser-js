import { AsyncAPIDocumentInterface } from './models';

import { createAsyncAPIDocument, isAsyncAPIDocument, isParsedDocument, isStringifiedDocument } from './document';
import { createDetailedAsyncAPI } from './utils';
import { xParserSpecStringified } from './constants';

import type { DetailedAsyncAPI } from './types';

export interface StringifyOptions {
  space?: string | number;
}

export function stringify(document: unknown, options: StringifyOptions = {}): string | undefined {
  if (isAsyncAPIDocument(document)) {
    document = document.json();
  } else if (isParsedDocument(document)) {
    if (isStringifiedDocument(document)) {
      return JSON.stringify(document);
    }
  } else {
    return;
  }

  return JSON.stringify({ 
    ...document as Record<string, unknown>,
    [String(xParserSpecStringified)]: true,
  }, refReplacer(), options.space || 2);
}

export function unstringify(document: unknown): AsyncAPIDocumentInterface | undefined {
  let parsed: unknown = document;
  if (typeof document === 'string') {
    try {
      parsed = JSON.parse(document); 
    } catch (_) {
      return;
    }
  }

  if (!isStringifiedDocument(parsed)) {
    return;
  }

  // shall copy of whole JSON
  parsed = { ...parsed };
  // remove `x-parser-spec-stringified` extension
  delete (<Record<string, any>>parsed)[String(xParserSpecStringified)];

  traverseStringifiedData(document, undefined, document, new Map(), new Map());
  return createAsyncAPIDocument(createDetailedAsyncAPI(document as string, parsed as DetailedAsyncAPI['parsed']));
}

export function copy(data: Record<string, any>) {
  const stringifiedData = JSON.stringify(data, refReplacer());
  const unstringifiedData = JSON.parse(stringifiedData);
  traverseStringifiedData(unstringifiedData, undefined, unstringifiedData, new Map(), new Map());
  return unstringifiedData;
}

function refReplacer() {
  const modelPaths = new Map();
  const paths = new Map();
  let init: unknown = null;

  return function(this: unknown, field: string, value: unknown) {
    // `this` points to parent object of given value - some object or array
    const pathPart = modelPaths.get(this) + (Array.isArray(this) ? `[${field}]` : `.${field}`);

    // check if `objOrPath` has "reference"
    const isComplex = value === Object(value);
    if (isComplex) {
      modelPaths.set(value, pathPart);
    }
    
    const savedPath = paths.get(value) || '';
    if (!savedPath && isComplex) {
      const valuePath = pathPart.replace(/undefined\.\.?/,'');
      paths.set(value, valuePath);
    }

    const prefixPath = savedPath[0] === '[' ? '$' : '$.';
    let val = savedPath ? `$ref:${prefixPath}${savedPath}` : value;
    if (init === null) {
      init = value;
    } else if (val === init) {
      val = '$ref:$';
    }
    return val;
  };
}

const refRoot = '$ref:$';
function traverseStringifiedData(parent: any, field: string | undefined, root: any, objToPath: Map<unknown, unknown>, pathToObj: Map<unknown, unknown>) {
  let objOrPath = parent;
  let path = refRoot;

  if (field !== undefined) {
    // here can be string with `$ref` prefix or normal value 
    objOrPath = parent[String(field)];
    const concatenatedPath = field ? `.${field}` : '';
    path = objToPath.get(parent) + (Array.isArray(parent) ? `[${field}]` : concatenatedPath);
  }

  objToPath.set(objOrPath, path);
  pathToObj.set(path, objOrPath);
  
  const ref = pathToObj.get(objOrPath);
  if (ref) {
    parent[String(field)] = ref;
  }
  if (objOrPath === refRoot || ref === refRoot) {
    parent[String(field)] = root;
  }

  // traverse all keys, only if object is array/object
  if (objOrPath === Object(objOrPath)) {
    for (const f in objOrPath) {
      traverseStringifiedData(objOrPath, f, root, objToPath, pathToObj);
    }
  }
}