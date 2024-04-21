import type { Parser } from '../../parser';
export declare const v2CoreRuleset: {
    description: string;
    formats: import("@stoplight/spectral-core").Format<void>[];
    rules: {
        /**
         * Server Object rules
         */
        'asyncapi2-server-security': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<Record<string, string[]>, {
                    objectType: "Server" | "Operation";
                }>;
                functionOptions: {
                    objectType: string;
                };
            };
        };
        'asyncapi2-server-variables': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string[];
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
                    url: string;
                    variables: Record<string, unknown>;
                }, null>;
            };
        };
        'asyncapi2-channel-no-query-nor-fragment': {
            description: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
                functionOptions: {
                    notMatch: string;
                };
            };
        };
        /**
         * Channel Object rules
         */
        'asyncapi2-channel-parameters': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
                    parameters: Record<string, unknown>;
                }, null>;
            };
        };
        'asyncapi2-channel-servers': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
                    servers?: Record<string, unknown> | undefined;
                    channels?: Record<string, {
                        servers?: string[] | undefined;
                    }> | undefined;
                }, null>;
            };
        };
        /**
         * Operation Object rules
         */
        'asyncapi2-operation-operationId-uniqueness': {
            description: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<import("../../spec-types/v2").AsyncAPIObject, null>;
            };
        };
        'asyncapi2-operation-security': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<Record<string, string[]>, {
                    objectType: "Server" | "Operation";
                }>;
                functionOptions: {
                    objectType: string;
                };
            };
        };
        /**
         * Message Object rules
         */
        'asyncapi2-message-examples': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string[];
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<import("../../spec-types/v2").MessageObject, null>;
            };
        };
        'asyncapi2-message-messageId-uniqueness': {
            description: string;
            severity: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<import("../../spec-types/v2").AsyncAPIObject, null>;
            };
        };
        /**
         * Misc rules
         */
        'asyncapi2-tags-uniqueness': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string[];
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
                    name: string;
                }[], null>;
            };
        };
    };
};
export declare const v2SchemasRuleset: (parser: Parser) => {
    description: string;
    rules: {
        'asyncapi2-schemas': import("@stoplight/spectral-core").RuleDefinition;
        'asyncapi2-schema-default': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string[];
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
                    default?: unknown;
                    examples?: unknown[] | undefined;
                }, {
                    type: "default" | "examples";
                }>;
                functionOptions: {
                    type: string;
                };
            };
        };
        'asyncapi2-schema-examples': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            given: string[];
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
                    default?: unknown;
                    examples?: unknown[] | undefined;
                }, {
                    type: "default" | "examples";
                }>;
                functionOptions: {
                    type: string;
                };
            };
        };
        'asyncapi2-message-examples-custom-format': import("@stoplight/spectral-core").RuleDefinition;
    };
};
export declare const v2RecommendedRuleset: {
    description: string;
    formats: import("@stoplight/spectral-core").Format<void>[];
    rules: {
        /**
         * Root Object rules
         */
        'asyncapi2-tags': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<unknown, null>;
            };
        };
        /**
         * Server Object rules
         */
        'asyncapi2-server-no-empty-variable': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
                functionOptions: {
                    notMatch: string;
                };
            };
        };
        'asyncapi2-server-no-trailing-slash': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
                functionOptions: {
                    notMatch: string;
                };
            };
        };
        /**
         * Channel Object rules
         */
        'asyncapi2-channel-no-empty-parameter': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
                functionOptions: {
                    notMatch: string;
                };
            };
        };
        'asyncapi2-channel-no-trailing-slash': {
            description: string;
            recommended: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
                functionOptions: {
                    notMatch: string;
                };
            };
        };
        /**
         * Operation Object rules
         */
        'asyncapi2-operation-operationId': {
            description: string;
            recommended: boolean;
            given: string[];
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<import("../utils").MaybeHaveTraits, {
                    idField: "operationId" | "messageId";
                }>;
                functionOptions: {
                    idField: string;
                };
            };
        };
        /**
         * Message Object rules
         */
        'asyncapi2-message-messageId': {
            description: string;
            recommended: boolean;
            formats: import("@stoplight/spectral-core").Format<void>[];
            given: string[];
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<import("../utils").MaybeHaveTraits, {
                    idField: "operationId" | "messageId";
                }>;
                functionOptions: {
                    idField: string;
                };
            };
        };
        /**
         * Component Object rules
         */
        'asyncapi2-unused-securityScheme': {
            description: string;
            recommended: boolean;
            resolved: boolean;
            severity: string;
            given: string;
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<import("../../spec-types/v2").AsyncAPIObject, null>;
            };
        };
    };
};
