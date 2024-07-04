import { createRulesetFunction } from '@stoplight/spectral-core';
import { isObject } from '../../../utils';

import type { IFunctionResult } from '@stoplight/spectral-core';
import type { v2 } from 'spec-types';

const oAuth2Keys = ['implicit', 'password', 'clientCredentials', 'authorizationCode'] as const;
function getAllScopes(oauth2: v2.OAuthFlowsObject): string[] {
  const scopes: string[] = [];
  oAuth2Keys.forEach(key => {
    const flow = oauth2[key] as v2.OAuthFlowObjectBase;
    if (isObject(flow)) {
      scopes.push(...Object.keys(flow.scopes));
    }
  });
  return Array.from(new Set(scopes));
}

export const security = createRulesetFunction<Record<string, string[]>, { objectType: 'Server' | 'Operation' }>(
  {
    input: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    options: {
      type: 'object',
      properties: {
        objectType: {
          type: 'string',
          enum: ['Server', 'Operation'],
        },
      },
    },
  },
  (targetVal = {}, { objectType }, ctx) => {
    const results: IFunctionResult[] = [];
    const spec = ctx.document.data as v2.AsyncAPIObject;
    const securitySchemes = spec?.components?.securitySchemes ?? {};
    const securitySchemesKeys = Object.keys(securitySchemes);

    Object.keys(targetVal).forEach(securityKey => {
      if (!securitySchemesKeys.includes(securityKey)) {
        results.push({
          message: `${objectType} must not reference an undefined security scheme.`,
          path: [...ctx.path, securityKey],
        });
      }

      const securityScheme = securitySchemes[securityKey] as v2.SecuritySchemeObject;
      if (securityScheme?.type === 'oauth2') {
        const availableScopes = getAllScopes(securityScheme.flows ?? {});
        targetVal[securityKey].forEach((securityScope, index) => {
          if (!availableScopes.includes(securityScope)) {
            results.push({
              message: `Non-existing security scope for the specified security scheme. Available: [${availableScopes.join(
                ', ',
              )}]`,
              path: [...ctx.path, securityKey, index],
            });
          }
        });
      }
    });

    return results;
  },
);
