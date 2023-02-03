import { createRulesetFunction } from '@stoplight/spectral-core';
import { getAllOperations } from '../utils';
import { isObject } from '../../../utils';

import type { IFunctionResult } from '@stoplight/spectral-core';
import type { v2 } from '../../../spec-types';

export const unusedSecuritySchemes = createRulesetFunction<v2.AsyncAPIObject, null>(
  {
    input: {
      type: 'object',
      properties: {
        components: {
          type: 'object',
        },
      },
      required: ['components'],
    },
    options: null,
  },
  (targetVal) => {
    const securitySchemes = targetVal.components?.securitySchemes;
    if (!isObject(securitySchemes)) {
      return;
    }

    const usedSecuritySchemes: string[] = [];
    // collect all security requirements from servers
    if (isObject(targetVal.servers)) {
      Object.values(targetVal.servers).forEach(server => {
        if (Array.isArray(server.security)) {
          server.security.forEach(requirements => {
            usedSecuritySchemes.push(...Object.keys(requirements));
          });
        }
      });
    }
    // collect all security requirements from servers
    const operations = getAllOperations(targetVal);
    for (const { operation } of operations) {
      if (Array.isArray(operation.security)) {
        operation.security.forEach(requirements => {
          usedSecuritySchemes.push(...Object.keys(requirements));
        });
      }
    }

    const usedSecuritySchemesSet = new Set(usedSecuritySchemes);
    const securitySchemesKinds = Object.keys(securitySchemes);

    const results: IFunctionResult[] = [];
    securitySchemesKinds.forEach(securitySchemeKind => {
      if (!usedSecuritySchemesSet.has(securitySchemeKind)) {
        results.push({
          message: 'Potentially unused security scheme has been detected in AsyncAPI document.',
          path: ['components', 'securitySchemes', securitySchemeKind],
        });
      }
    });
    return results;
  },
);
