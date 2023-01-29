/* eslint-disable sonarjs/no-duplicate-string */

import { aas2All as aas2AllFormats } from '../formats';
import { truthy, pattern } from '@stoplight/spectral-functions';

import { channelParameters } from './functions/channelParameters';
import { channelServers } from './functions/channelServers';
import { checkId } from './functions/checkId';
import { messageExamples } from './functions/messageExamples';
import { messageIdUniqueness } from './functions/messageIdUniqueness';
import { operationIdUniqueness } from './functions/operationIdUniqueness';
import { security } from './functions/security';
import { serverVariables } from './functions/serverVariables';
import { uniquenessTags } from '../functions/uniquenessTags';

const from_aas2_4 = aas2AllFormats.slice(4);

export const v2CoreRuleset = {
  description: 'Core AsyncAPI 2.x.x ruleset.',
  documentationUrl: 'https://meta.stoplight.io/docs/spectral/docs/reference/asyncapi-rules.md',
  formats: [...aas2AllFormats],
  rules: {
    /**
     * Server Object rules
     */
    'asyncapi2-server-security': {
      description: 'Server have to reference a defined security schemes.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      given: '$.servers.*.security.*',
      then: {
        function: security,
        functionOptions: {
          objectType: 'Server',
        },
      },
    },
    'asyncapi2-server-variables': {
      description: 'Server variables must be defined and there must be no redundant variables.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      given: ['$.servers.*', '$.components.servers.*'],
      then: {
        function: serverVariables,
      },
    },

    /**
     * Channel Object rules
     */
    'asyncapi2-channel-parameters': {
      description: 'Channel parameters must be defined and there must be no redundant parameters.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      given: '$.channels.*',
      then: {
        function: channelParameters,
      },
    },
    'asyncapi2-channel-servers': {
      description: 'Channel servers must be defined in the "servers" object.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      given: '$',
      then: {
        function: channelServers,
      },
    },

    /**
     * Operation Object rules
     */
    'asyncapi2-operation-operationId-uniqueness': {
      description: '"operationId" must be unique across all the operations.',
      severity: 'error',
      recommended: true,
      given: '$',
      then: {
        function: operationIdUniqueness,
      },
    },
    'asyncapi2-operation-security': {
      description: 'Operation have to reference a defined security schemes.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      given: '$.channels[*][publish,subscribe].security.*',
      then: {
        function: security,
        functionOptions: {
          objectType: 'Operation',
        },
      },
    },

    /**
     * Message Object rules
     */
    'asyncapi2-message-examples': {
      description: 'Examples of message object should follow by "payload" and "headers" schemas.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      given: [
        // messages
        '$.channels.*.[publish,subscribe].message',
        '$.channels.*.[publish,subscribe].message.oneOf.*',
        '$.components.channels.*.[publish,subscribe].message',
        '$.components.channels.*.[publish,subscribe].message.oneOf.*',
        '$.components.messages.*',
        // message traits
        '$.channels.*.[publish,subscribe].message.traits.*',
        '$.channels.*.[publish,subscribe].message.oneOf.*.traits.*',
        '$.components.channels.*.[publish,subscribe].message.traits.*',
        '$.components.channels.*.[publish,subscribe].message.oneOf.*.traits.*',
        '$.components.messages.*.traits.*',
        '$.components.messageTraits.*',
      ],
      then: {
        function: messageExamples,
      },
    },
    'asyncapi2-message-messageId-uniqueness': {
      description: '"messageId" must be unique across all the messages.',
      severity: 'error',
      recommended: true,
      given: '$',
      then: {
        function: messageIdUniqueness,
      },
    },

    /**
     * Misc rules
     */
    'asyncapi2-tags-uniqueness': {
      description: 'Each tag must have a unique name.',
      message: '{{error}}',
      severity: 'error',
      recommended: true,
      given: [
        // root
        '$.tags',
        // operations
        '$.channels.*.[publish,subscribe].tags',
        '$.components.channels.*.[publish,subscribe].tags',
        // operation traits
        '$.channels.*.[publish,subscribe].traits.*.tags',
        '$.components.channels.*.[publish,subscribe].traits.*.tags',
        '$.components.operationTraits.*.tags',
        // messages
        '$.channels.*.[publish,subscribe].message.tags',
        '$.channels.*.[publish,subscribe].message.oneOf.*.tags',
        '$.components.channels.*.[publish,subscribe].message.tags',
        '$.components.channels.*.[publish,subscribe].message.oneOf.*.tags',
        '$.components.messages.*.tags',
        // message traits
        '$.channels.*.[publish,subscribe].message.traits.*.tags',
        '$.channels.*.[publish,subscribe].message.oneOf.*.traits.*.tags',
        '$.components.channels.*.[publish,subscribe].message.traits.*.tags',
        '$.components.channels.*.[publish,subscribe].message.oneOf.*.traits.*.tags',
        '$.components.messages.*.traits.*.tags',
        '$.components.messageTraits.*.tags',
      ],
      then: {
        function: uniquenessTags,
      },
    },
  },
};

export const v2RecommendedRuleset = {
  description: 'Recommended AsyncAPI 2.x.x ruleset.',
  documentationUrl: 'https://meta.stoplight.io/docs/spectral/docs/reference/asyncapi-rules.md',
  formats: [...aas2AllFormats],
  rules: {
    /**
     * Root Object rules
     */
    'asyncapi2-tags': {
      description: 'AsyncAPI object should have non-empty "tags" array.',
      recommended: true,
      given: '$',
      then: {
        field: 'tags',
        function: truthy,
      },
    },

    /**
     * Server Object rules
     */
    'asyncapi2-server-no-empty-variable': {
      description: 'Server URL should not have empty variable substitution pattern.',
      recommended: true,
      given: '$.servers[*].url',
      then: {
        function: pattern,
        functionOptions: {
          notMatch: '{}',
        },
      },
    },
    'asyncapi2-server-no-trailing-slash': {
      description: 'Server URL should not end with slash.',
      recommended: true,
      given: '$.servers[*].url',
      then: {
        function: pattern,
        functionOptions: {
          notMatch: '/$',
        },
      },
    },

    /**
     * Channel Object rules
     */
    'asyncapi2-channel-no-empty-parameter': {
      description: 'Channel address should not have empty parameter substitution pattern.',
      recommended: true,
      given: '$.channels',
      then: {
        field: '@key',
        function: pattern,
        functionOptions: {
          notMatch: '{}',
        },
      },
    },
    'asyncapi2-channel-no-query-nor-fragment': {
      description: 'Channel address should not include query ("?") or fragment ("#") delimiter.',
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
    'asyncapi2-channel-no-trailing-slash': {
      description: 'Channel address should not end with slash.',
      recommended: true,
      given: '$.channels',
      then: {
        field: '@key',
        function: pattern,
        functionOptions: {
          notMatch: '.+\\/$',
        },
      },
    },

    /**
     * Operation Object rules
     */
    'asyncapi2-operation-operationId': {
      description: 'Operation should have an "operationId" field defined.',
      recommended: true,
      given: ['$.channels[*][publish,subscribe]', '$.components.channels[*][publish,subscribe]'],
      then: {
        function: checkId,
        functionOptions: {
          idField: 'operationId',
        },
      },
    },

    /**
     * Message Object rules
     */
    'asyncapi2-message-messageId': {
      description: 'Message should have a "messageId" field defined.',
      recommended: true,
      formats: from_aas2_4,
      given: [
        '$.channels.*.[publish,subscribe][?(@property === "message" && @.oneOf == void 0)]',
        '$.channels.*.[publish,subscribe].message.oneOf.*',
        '$.components.channels.*.[publish,subscribe][?(@property === "message" && @.oneOf == void 0)]',
        '$.components.channels.*.[publish,subscribe].message.oneOf.*',
        '$.components.messages.*',
      ],
      then: {
        function: checkId,
        functionOptions: {
          idField: 'messageId',
        },
      },
    },
  },
};
