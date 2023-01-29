import { unreferencedReusableObject } from '@stoplight/spectral-functions';
import { createRulesetFunction } from '@stoplight/spectral-core';
import { isObject } from '../../utils';

import type { IFunctionResult } from '@stoplight/spectral-core';

export const unusedComponent = createRulesetFunction<{ components: Record<string, unknown> }, null>(
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
  (targetVal, _, context) => {
    const components = targetVal.components;

    const results: IFunctionResult[] = [];
    Object.keys(components).forEach(componentType => {
      const value = components[componentType];
      if (!isObject(value)) {
        return;
      }

      const resultsForType = unreferencedReusableObject(
        value,
        { reusableObjectsLocation: `#/components/${componentType}` },
        context,
      );

      if (resultsForType && Array.isArray(resultsForType)) {
        results.push(...resultsForType);
      }
    });
    return results;
  },
);