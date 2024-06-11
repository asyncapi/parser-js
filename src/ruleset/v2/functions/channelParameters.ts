import { createRulesetFunction } from '@stoplight/spectral-core';

import { getMissingProps, getRedundantProps, parseUrlVariables } from '../../utils';

import type { IFunctionResult } from '@stoplight/spectral-core';

export const channelParameters = createRulesetFunction<{ parameters: Record<string, unknown> }, null>(
  {
    input: {
      type: 'object',
      properties: {
        parameters: {
          type: 'object',
        },
      },
      required: ['parameters'],
    },
    options: null,
  },
  (targetVal, _, ctx) => {
    const path = ctx.path[ctx.path.length - 1] as string;
    const results: IFunctionResult[] = [];

    const parameters = parseUrlVariables(path);
    
    const hasParameters = Object.keys(targetVal.parameters).length > 0;
    if (hasParameters && (path === null || parameters.length === 0)) {
      results.push({
        message: `Channel has parameters defined, but the address is null or does not contain any parameters.`,
        path: ctx.path.slice(0, -1),
      });
      return results;
    }

    const missingParameters = getMissingProps(parameters, targetVal.parameters);
    if (missingParameters.length) {
      results.push({
        message: `Not all channel's parameters are described with "parameters" object. Missed: ${missingParameters.join(
          ', ',
        )}.`,
        path: [...ctx.path, 'parameters'],
      });
    }

    const redundantParameters = getRedundantProps(parameters, targetVal.parameters);
    if (redundantParameters.length) {
      redundantParameters.forEach(param => {
        results.push({
          message: `Channel's "parameters" object has redundant defined "${param}" parameter.`,
          path: [...ctx.path, 'parameters', param],
        });
      });
    }

    return results;
  },
);