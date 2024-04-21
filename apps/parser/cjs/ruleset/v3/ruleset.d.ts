export declare const v3CoreRuleset: {
    description: string;
    formats: import("@stoplight/spectral-core").Format<void>[];
    rules: {
        /**
         * Operation Object rules
         */
        'asyncapi3-operation-messages-from-referred-channel': {
            description: string;
            message: string;
            severity: string;
            recommended: boolean;
            resolved: boolean;
            given: string[];
            then: {
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
                    channel?: {
                        $ref: string;
                    } | undefined;
                    messages?: [{
                        $ref: string;
                    }] | undefined;
                }, null>;
            };
        };
        'asyncapi3-required-operation-channel-unambiguity': {
            description: string;
            severity: string;
            recommended: boolean;
            resolved: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
                functionOptions: {
                    match: string;
                };
            };
        };
        /**
         * Channel Object rules
         */
        'asyncapi3-required-channel-servers-unambiguity': {
            description: string;
            severity: string;
            recommended: boolean;
            resolved: boolean;
            given: string;
            then: {
                field: string;
                function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
                functionOptions: {
                    match: string;
                };
            };
        };
    };
};
