"use strict";
/* eslint-disable sonarjs/no-duplicate-string */
Object.defineProperty(exports, "__esModule", { value: true });
exports.v3CoreRuleset = void 0;
const formats_1 = require("../formats");
const operationMessagesUnambiguity_1 = require("./functions/operationMessagesUnambiguity");
const spectral_functions_1 = require("@stoplight/spectral-functions");
exports.v3CoreRuleset = {
    description: 'Core AsyncAPI 3.x.x ruleset.',
    formats: formats_1.AsyncAPIFormats.filterByMajorVersions(['3']).formats(),
    rules: {
        /**
         * Operation Object rules
         */
        'asyncapi3-operation-messages-from-referred-channel': {
            description: 'Operation "messages" must be a subset of the messages defined in the channel referenced in this operation.',
            message: '{{error}}',
            severity: 'error',
            recommended: true,
            resolved: false,
            given: [
                '$.operations.*',
                '$.components.operations.*',
            ],
            then: {
                function: operationMessagesUnambiguity_1.operationMessagesUnambiguity,
            },
        },
        'asyncapi3-required-operation-channel-unambiguity': {
            description: 'The "channel" field of an operation under the root "operations" object must always reference a channel under the root "channels" object.',
            severity: 'error',
            recommended: true,
            resolved: false,
            given: '$.operations.*',
            then: {
                field: 'channel.$ref',
                function: spectral_functions_1.pattern,
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
            resolved: false,
            given: '$.channels.*',
            then: {
                field: '$.servers.*.$ref',
                function: spectral_functions_1.pattern,
                functionOptions: {
                    match: '#\\/servers\\/', // If doesn't match, rule fails.
                },
            },
        }
    },
};
