import { createRulesetFunction } from '@stoplight/spectral-core';

import { getMissingProps, getRedundantProps, parseUrlVariables } from '../../utils';

import type { IFunctionResult } from '@stoplight/spectral-core';

export const v3ChannelParameters = createRulesetFunction<{ address?: string | null; parameters?: Record<string, unknown> }, null>(
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
    },
    options: null,
  },
  (targetVal, _, ctx) => {
    const results: IFunctionResult[] = [];

    const address = targetVal.address;
    const parameters = targetVal.parameters;

    // If parameters is provided but address has no template variables (or is null/empty), it's redundant.
    if (parameters && Object.keys(parameters).length > 0) {
      const variables = address ? parseUrlVariables(address) : [];
      if (variables.length === 0) {
        results.push({
          message: 'Channel\'s "parameters" object is defined but "address" does not contain any parameter placeholders, or "address" is null/empty. The "parameters" object is redundant.',
          path: [...ctx.path, 'parameters'],
        });
        return results;
      }

      // If address has variables, check that all are defined and there are no redundant parameters.
      const missingParameters = getMissingProps(variables, parameters);
      if (missingParameters.length) {
        results.push({
          message: `Not all channel's parameters are described with "parameters" object. Missed: ${missingParameters.join(', ')}.`,
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
    }

    return results;
  },
);
