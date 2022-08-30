import { createRulesetFunction } from '@stoplight/spectral-core';
import { asyncapi as aasRuleset } from "@stoplight/spectral-rulesets";

import { aas2SchemaParserRule } from './schema-parser/spectral-rule-v2';
import { specVersions } from './constants';
import { isObject } from './utils';

import type { RuleDefinition, RulesetDefinition } from "@stoplight/spectral-core";
import type { Parser } from "./parser";
import type { MaybeAsyncAPI } from "./types";

export function configureSpectral(parser: Parser) {
  const ruleset = configureRuleset(parser);
  parser.spectral.setRuleset(ruleset);
}

function configureRuleset(parser: Parser): RulesetDefinition {
  return {
    extends: [aasRuleset],
    rules: {
      'asyncapi-is-asyncapi': asyncApi2IsAsyncAPI(),
      'asyncapi-schemas-v2': aas2SchemaParserRule(parser),
      // We do not use these rules from the official ruleset due to the fact 
      // that the given rules validate only AsyncAPI Schemas and prevent defining schemas in other formats 
      'asyncapi-payload-unsupported-schemaFormat': 'off',
      'asyncapi-payload': 'off',
    },
  } as RulesetDefinition;
}

function asyncApi2IsAsyncAPI(): RuleDefinition {
  return {
    description: 'Custom schema must be correctly formatted from the point of view of the used format.',
    formats: [(_: unknown) => true], // run rule for all inputs
    message: '{{error}}',
    severity: 'error',
    type: 'validation',
    recommended: true,
    given: '$',
    then: {
      function: createRulesetFunction<MaybeAsyncAPI, null>(
        {
          input: null,
          options: null,
        },
        function asyncApi2IsAsyncAPI(targetVal) {
          if (!isObject(targetVal) || typeof targetVal.asyncapi !== 'string') {
            return [
              {
                message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
                path: [],
              }
            ];
          } else if (!specVersions.includes(targetVal.asyncapi)) {
            return [
              {
                message: `Version "${targetVal.asyncapi}" is not supported. Please use "${specVersions[specVersions.length - 1]}" (latest) version of the specification.`,
                path: [],
              }
            ];
          }
        }
      ),
    },
  }
}