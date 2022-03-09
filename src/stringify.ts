import { AsyncAPIDocument } from './models';

import { isAsyncAPIDocument, isParsedDocument, isStringifiedDocument } from './utils';
import { xParserSpecStringified } from './constants';

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
    document = document;
  } else {
    return;
  }

  return JSON.stringify({ 
    ...document as Record<string, unknown>,
    [String(xParserSpecStringified)]: true,
  }, refReplacer(), options.space || 2);
}

export function unstringify(document: unknown): AsyncAPIDocument | undefined {
  if (!isStringifiedDocument(document)) {
    return;
  }

  // shall copy of whole JSON
  document = { ...document };
  // remove `x-parser-spec-stringified` extension
  delete (<Record<string, any>>document)[String(xParserSpecStringified)];

  traverseStringifiedDoc(document, undefined, document, new Map(), new Map());
  return new AsyncAPIDocument(<Record<string, any>>document);
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
function traverseStringifiedDoc(parent: any, field: string | undefined, root: any, objToPath: Map<unknown, unknown>, pathToObj: Map<unknown, unknown>) {
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
      traverseStringifiedDoc(objOrPath, f, root, objToPath, pathToObj);
    }
  }
}