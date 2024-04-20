import { setExtension } from '../utils';
import { xParserCircular } from '../constants';

import type { AsyncAPIDocumentInterface } from '../models';

export function checkCircularRefs(document: AsyncAPIDocumentInterface) {
  if (hasInlineRef(document.json())) {
    setExtension(xParserCircular, true, document);
  }
}

function hasInlineRef(data: Record<string, any>): boolean {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    if (Object.prototype.hasOwnProperty.call(data, '$ref')) {
      return true;
    }
    for (const p in data) {
      if (hasInlineRef(data[p])) { 
        return true;
      }
    }
  }
  return false; 
}
