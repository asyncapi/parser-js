/* eslint-disable sonarjs/no-duplicate-string */

import { AsyncAPIFormats } from '../formats';
import { operationMessagesUnambiguity } from './functions/operationMessagesUnambiguity';

export const v3CoreRuleset = {
  description: 'Core AsyncAPI 3.x.x ruleset.',
  formats: AsyncAPIFormats.filterByMajorVersions(['3']).formats(),
  rules: {
    /**
     * Operation Object rules
     */
    'asyncapi3-operation-messages-from-referred-channel': {
      description: 'Operation "messages" must be a subset of the messages defined in the channel referenced in this operation.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      resolved: false, // We use the JSON pointer to match the channel.
      given: [
        '$.operations.*',
        '$.components.operations.*',
      ],
      then: {
        function: operationMessagesUnambiguity,
      },
    },
  },
};
