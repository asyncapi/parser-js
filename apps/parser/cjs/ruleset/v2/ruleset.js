"use strict";
/* eslint-disable sonarjs/no-duplicate-string */
Object.defineProperty(exports, "__esModule", { value: true });
exports.v2RecommendedRuleset = exports.v2SchemasRuleset = exports.v2CoreRuleset = void 0;
const formats_1 = require("../formats");
const spectral_functions_1 = require("@stoplight/spectral-functions");
const channelParameters_1 = require("./functions/channelParameters");
const channelServers_1 = require("./functions/channelServers");
const checkId_1 = require("./functions/checkId");
const messageExamples_1 = require("./functions/messageExamples");
const messageExamples_spectral_rule_v2_1 = require("./functions/messageExamples-spectral-rule-v2");
const messageIdUniqueness_1 = require("./functions/messageIdUniqueness");
const operationIdUniqueness_1 = require("./functions/operationIdUniqueness");
const schemaValidation_1 = require("./functions/schemaValidation");
const security_1 = require("./functions/security");
const serverVariables_1 = require("./functions/serverVariables");
const unusedSecuritySchemes_1 = require("./functions/unusedSecuritySchemes");
const uniquenessTags_1 = require("../functions/uniquenessTags");
const spectral_rule_v2_1 = require("../../schema-parser/spectral-rule-v2");
exports.v2CoreRuleset = {
    description: 'Core AsyncAPI 2.x.x ruleset.',
    formats: formats_1.AsyncAPIFormats.filterByMajorVersions(['2']).formats(),
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
                function: security_1.security,
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
                function: serverVariables_1.serverVariables,
            },
        },
        'asyncapi2-channel-no-query-nor-fragment': {
            description: 'Channel address should not include query ("?") or fragment ("#") delimiter.',
            severity: 'error',
            recommended: true,
            given: '$.channels',
            then: {
                field: '@key',
                function: spectral_functions_1.pattern,
                functionOptions: {
                    notMatch: '[\\?#]',
                },
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
                function: channelParameters_1.channelParameters,
            },
        },
        'asyncapi2-channel-servers': {
            description: 'Channel servers must be defined in the "servers" object.',
            message: '{{error}}',
            severity: 'error',
            recommended: true,
            given: '$',
            then: {
                function: channelServers_1.channelServers,
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
                function: operationIdUniqueness_1.operationIdUniqueness,
            },
        },
        'asyncapi2-operation-security': {
            description: 'Operation have to reference a defined security schemes.',
            message: '{{error}}',
            severity: 'error',
            recommended: true,
            given: '$.channels[*][publish,subscribe].security.*',
            then: {
                function: security_1.security,
                functionOptions: {
                    objectType: 'Operation',
                },
            },
        },
        /**
         * Message Object rules
         */
        'asyncapi2-message-examples': {
            description: 'Examples of message object should validate againt the "payload" and "headers" schemas.',
            message: '{{error}}',
            severity: 'error',
            recommended: true,
            given: [
                // messages
                '$.channels.*.[publish,subscribe][?(@property === \'message\' && @.schemaFormat === void 0)]',
                '$.channels.*.[publish,subscribe].message.oneOf[?(!@null && @.schemaFormat === void 0)]',
                '$.components.channels.*.[publish,subscribe][?(@property === \'message\' && @.schemaFormat === void 0)]',
                '$.components.channels.*.[publish,subscribe].message.oneOf[?(!@null && @.schemaFormat === void 0)]',
                '$.components.messages[?(!@null && @.schemaFormat === void 0)]',
                // message traits
                '$.channels.*.[publish,subscribe].message.traits[?(!@null && @.schemaFormat === void 0)]',
                '$.channels.*.[publish,subscribe].message.oneOf.*.traits[?(!@null && @.schemaFormat === void 0)]',
                '$.components.channels.*.[publish,subscribe].message.traits[?(!@null && @.schemaFormat === void 0)]',
                '$.components.channels.*.[publish,subscribe].message.oneOf.*.traits[?(!@null && @.schemaFormat === void 0)]',
                '$.components.messages.*.traits[?(!@null && @.schemaFormat === void 0)]',
                '$.components.messageTraits[?(!@null && @.schemaFormat === void 0)]',
            ],
            then: {
                function: messageExamples_1.messageExamples,
            },
        },
        'asyncapi2-message-messageId-uniqueness': {
            description: '"messageId" must be unique across all the messages.',
            severity: 'error',
            recommended: true,
            given: '$',
            then: {
                function: messageIdUniqueness_1.messageIdUniqueness,
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
                function: uniquenessTags_1.uniquenessTags,
            },
        },
    },
};
const v2SchemasRuleset = (parser) => {
    return {
        description: 'Schemas AsyncAPI 2.x.x ruleset.',
        rules: {
            'asyncapi2-schemas': (0, spectral_rule_v2_1.asyncApi2SchemaParserRule)(parser),
            'asyncapi2-schema-default': {
                description: 'Default must be valid against its defined schema.',
                message: '{{error}}',
                severity: 'error',
                recommended: true,
                given: [
                    '$.channels[*][publish,subscribe][?(@property === \'message\' && @.schemaFormat === void 0)].payload.default^',
                    '$.channels.*.parameters.*.schema.default^',
                    '$.components.channels[*][publish,subscribe][?(@property === \'message\' && @.schemaFormat === void 0)].payload.default^',
                    '$.components.channels.*.parameters.*.schema.default^',
                    '$.components.schemas.*.default^',
                    '$.components.parameters.*.schema.default^',
                    '$.components.messages[?(@.schemaFormat === void 0)].payload.default^',
                    '$.components.messageTraits[?(@.schemaFormat === void 0)].payload.default^',
                ],
                then: {
                    function: schemaValidation_1.schemaValidation,
                    functionOptions: {
                        type: 'default',
                    },
                },
            },
            'asyncapi2-schema-examples': {
                description: 'Examples must be valid against their defined schema.',
                message: '{{error}}',
                severity: 'error',
                recommended: true,
                given: [
                    '$.channels[*][publish,subscribe][?(@property === \'message\' && @.schemaFormat === void 0)].payload.examples^',
                    '$.channels.*.parameters.*.schema.examples^',
                    '$.components.channels[*][publish,subscribe][?(@property === \'message\' && @.schemaFormat === void 0)].payload.examples^',
                    '$.components.channels.*.parameters.*.schema.examples^',
                    '$.components.schemas.*.examples^',
                    '$.components.parameters.*.schema.examples^',
                    '$.components.messages[?(@.schemaFormat === void 0)].payload.examples^',
                    '$.components.messageTraits[?(@.schemaFormat === void 0)].payload.examples^',
                ],
                then: {
                    function: schemaValidation_1.schemaValidation,
                    functionOptions: {
                        type: 'examples',
                    },
                },
            },
            'asyncapi2-message-examples-custom-format': (0, messageExamples_spectral_rule_v2_1.asyncApi2MessageExamplesParserRule)(parser),
        }
    };
};
exports.v2SchemasRuleset = v2SchemasRuleset;
exports.v2RecommendedRuleset = {
    description: 'Recommended AsyncAPI 2.x.x ruleset.',
    formats: formats_1.AsyncAPIFormats.filterByMajorVersions(['2']).formats(),
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
                function: spectral_functions_1.truthy,
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
                function: spectral_functions_1.pattern,
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
                function: spectral_functions_1.pattern,
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
                function: spectral_functions_1.pattern,
                functionOptions: {
                    notMatch: '{}',
                },
            },
        },
        'asyncapi2-channel-no-trailing-slash': {
            description: 'Channel address should not end with slash.',
            recommended: true,
            given: '$.channels',
            then: {
                field: '@key',
                function: spectral_functions_1.pattern,
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
                function: checkId_1.checkId,
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
            formats: formats_1.AsyncAPIFormats.filterByMajorVersions(['2']).excludeByVersions(['2.0.0', '2.1.0', '2.2.0', '2.3.0']).formats(),
            given: [
                '$.channels.*.[publish,subscribe][?(@property === "message" && @.oneOf == void 0)]',
                '$.channels.*.[publish,subscribe].message.oneOf.*',
                '$.components.channels.*.[publish,subscribe][?(@property === "message" && @.oneOf == void 0)]',
                '$.components.channels.*.[publish,subscribe].message.oneOf.*',
                '$.components.messages.*',
            ],
            then: {
                function: checkId_1.checkId,
                functionOptions: {
                    idField: 'messageId',
                },
            },
        },
        /**
         * Component Object rules
         */
        'asyncapi2-unused-securityScheme': {
            description: 'Potentially unused security scheme has been detected in AsyncAPI document.',
            recommended: true,
            resolved: false,
            severity: 'info',
            given: '$',
            then: {
                function: unusedSecuritySchemes_1.unusedSecuritySchemes,
            },
        },
    },
};
