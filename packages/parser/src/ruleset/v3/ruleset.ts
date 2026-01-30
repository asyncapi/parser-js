
/* eslint-disable sonarjs/no-duplicate-string */

import { AsyncAPIFormats } from '../formats';
import { operationMessagesUnambiguity } from './functions/operationMessagesUnambiguity';
import { requiredOperationChannelUnambiguity } from './functions/requiredOperationChannelUnambiguity';
import { requiredChannelServersUnambiguity } from './functions/requiredChannelServersUnambiguity';
import { pattern } from '@stoplight/spectral-functions';
import { channelServers } from '../functions/channelServers';

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
     * This rule runs on the RESOLVED document to catch cases where external file
     * references resolve to channels that are not in the root channels object.
     * See: https://github.com/asyncapi/parser-js/issues/924
     */
    'asyncapi3-required-operation-channel-unambiguity-resolved': {
      description: 'The "channel" field of an operation under the root "operations" object must resolve to a channel defined in the root "channels" object.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      resolved: true, // Run on resolved document to catch external file references
      given: '$',
      then: {
        function: requiredOperationChannelUnambiguity,
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
    /**
     * This rule runs on the RESOLVED document to catch cases where external file
     * references resolve to servers that are not in the root servers object.
     * See: https://github.com/asyncapi/parser-js/issues/924
     */
    'asyncapi3-required-channel-servers-unambiguity-resolved': {
      description: 'The "servers" field of a channel under the root "channels" object must resolve to servers defined in the root "servers" object.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      resolved: true, // Run on resolved document to catch external file references
      given: '$',
      then: {
        function: requiredChannelServersUnambiguity,
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
