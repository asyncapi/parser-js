
/* eslint-disable sonarjs/no-duplicate-string */

import { AsyncAPIFormats } from '../formats';
import { operationMessagesUnambiguity } from './functions/operationMessagesUnambiguity';
import { pattern, truthy } from '@stoplight/spectral-functions';
import { channelServers } from '../functions/channelServers';

export const v3CoreRuleset = {
  description: 'Core AsyncAPI 3.x.x ruleset.',
  formats: AsyncAPIFormats.filterByMajorVersions(['3']).formats(),
  rules: {
    /**
     * Operation Object rules
     */
    'channel-parameters-require-address': {
      description: 'Channel address must not be null when parameters are defined.',
      message: 'Channel address must not be null when parameters are defined.',
      severity: 'error',
      recommended: true,
      given: [
        '$.channels[?(@.parameters)]',
        '$.components.channels[?(@.parameters)]'
      ],
      then: {
        field: 'address',
        function: truthy,
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
    'asyncapi3-channel-servers': {
      description: 'Channel servers must be defined in the "servers" object.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      given: '$',
      then: { // NOSONAR
        function: channelServers,
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
