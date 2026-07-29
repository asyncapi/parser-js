import { createRulesetFunction } from '@stoplight/spectral-core';

import { getMissingProps, getRedundantProps, parseUrlVariables } from '../../utils';

import type { IFunctionResult } from '@stoplight/spectral-core';

export const v3ChannelParameters = createRulesetFunction<
  { address?: string | null; parameters?: Record<string, unknown> },
  null
>(
  {
    input: {
      type: 'object',
      properties: {
        address: {
          type: ['string', 'null'],
        },
        parameters: {
          type: 'object',
        },
      },
      required: ['parameters'],
    },
    options: null,
  },
  (targetVal, _, ctx) => {
    const { address, parameters } = targetVal;
    if (!parameters) return;

    const variables = parseUrlVariables(address ?? '');
    const results: IFunctionResult[] = [];

    const missingParameters = getMissingProps(variables, parameters);
    if (missingParameters.length) {
      results.push({
        message: `Not all channel's parameters are described with "parameters" object. Missed: ${missingParameters.join(
          ', ',
        )}.`,
        path: [...ctx.path, 'parameters'],
      });
    }

    const redundantParameters = getRedundantProps(variables, parameters);
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
