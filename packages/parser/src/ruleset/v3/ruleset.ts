/* eslint-disable sonarjs/no-duplicate-string */

import { AsyncAPIFormats } from '../formats';
import { operationMessagesUnambiguity } from './functions/operationMessagesUnambiguity';
import { pattern } from '@stoplight/spectral-functions';

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
    'asyncapi3-required-operation-channel-unambiguity': {
      description: 'The "channel" field of an operation under the root "operations" object must always reference a channel under the root "channels" object.',
      severity: 'error',
      recommended: true,
      resolved: false, // We use the JSON pointer to match the channel.
      given: '$.operations.*',      
      then: {
        field: 'channel.$ref',
        function: pattern,
        functionOptions: {
          match: '#\\/channels\\/', // If doesn't match, rule fails.
        },
      },
    },
    
    /**
     * Channel Object rules
     */
    'asyncapi3-required-channel-servers-unambiguity': {
      description: 'The "servers" field of a channel under the root "channels" object must always reference a subset of the servers under the root "servers" object.',
      severity: 'error',
      recommended: true,
      resolved: false, // We use the JSON pointer to match the channel.
      given: '$.channels.*',      
      then: {
        field: '$.servers.*.$ref',
        function: pattern,
        functionOptions: {
          match: '#\\/servers\\/', // If doesn't match, rule fails.
        },
      },
    },
    'asyncapi3-channel-no-query-nor-fragment': {
      description: 'Channel address should not include query ("?") or fragment ("#") delimiter.',
      severity: 'error',
      recommended: true,
      given: '$.channels',
      then: {
        field: '@key',
        function: pattern,
        functionOptions: {
          notMatch: '[\\?#]',
        },
      },
    },
  },
};
