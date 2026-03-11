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
    const results: IFunctionResult[] = [];

    // Channel address is the key under `channels`
    const channelAddress = ctx.path[ctx.path.length - 1];

    if (typeof channelAddress !== 'string' || channelAddress.trim().length === 0) {
      results.push({
        message: 'Channel address must be a non-empty string when "parameters" are provided.',
        path: [...ctx.path],
      });
      return results;
    }

    const parameters = parseUrlVariables(channelAddress);
    if (parameters.length === 0) return;

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
