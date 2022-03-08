"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpectral = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const asyncapi_1 = __importDefault(require("@stoplight/spectral-rulesets/dist/asyncapi"));
const resolver_1 = require("./resolver");
const spectral_rule_v2_1 = require("./schema-parser/spectral-rule-v2");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
function createSpectral(parser, options = {}) {
    var _a;
    const spectral = new spectral_core_1.Spectral({ resolver: (0, resolver_1.createResolver)((_a = options.__unstable) === null || _a === void 0 ? void 0 : _a.resolver) });
    const ruleset = configureRuleset(parser);
    spectral.setRuleset(ruleset);
    return spectral;
}
exports.createSpectral = createSpectral;
function configureRuleset(parser) {
    return {
        extends: [asyncapi_1.default],
        rules: {
            'asyncapi-is-asyncapi': asyncApi2IsAsyncApi(),
            'asyncapi-schemas-v2': (0, spectral_rule_v2_1.asyncApi2SchemaParserRule)(parser),
            // operationId is an optional field
            'asyncapi-operation-operationId': 'warn',
            // We do not use these rules from the official ruleset due to the fact 
            // that the given rules validate only AsyncAPI Schemas and prevent defining schemas in other formats 
            'asyncapi-payload-unsupported-schemaFormat': 'off',
            'asyncapi-payload': 'off',
        },
    };
}
function asyncApi2IsAsyncApi() {
    return {
        description: 'The input must be a document with a supported version of AsyncAPI.',
        formats: [() => true],
        message: '{{error}}',
        severity: 'error',
        type: 'validation',
        recommended: true,
        given: '$',
        then: {
            function: (0, spectral_core_1.createRulesetFunction)({
                input: null,
                options: null,
            }, (targetVal) => {
                if (!(0, utils_1.isObject)(targetVal) || typeof targetVal.asyncapi !== 'string') {
                    return [
                        {
                            message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
                            path: [],
                        }
                    ];
                }
                else if (!constants_1.specVersions.includes(targetVal.asyncapi)) {
                    return [
                        {
                            message: `Version "${targetVal.asyncapi}" is not supported. Please use "${constants_1.specVersions[constants_1.specVersions.length - 1]}" (latest) version of the specification.`,
                            path: [],
                        }
                    ];
                }
            }),
        },
    };
}
