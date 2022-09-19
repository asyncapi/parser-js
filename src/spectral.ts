import { Spectral, createRulesetFunction } from '@stoplight/spectral-core';
import aasRuleset from '@stoplight/spectral-rulesets/dist/asyncapi';

import { createResolver } from './resolver';
import { asyncApi2SchemaParserRule } from './schema-parser/spectral-rule-v2';
import { specVersions } from './constants';
import { isObject } from './utils';

import type { RuleDefinition, RulesetDefinition } from '@stoplight/spectral-core';
import type { Parser, ParserOptions } from './parser';
import type { MaybeAsyncAPI } from './types';

export function createSpectral(parser: Parser, options: ParserOptions): Spectral {
  const spectral = new Spectral({ resolver: createResolver(options.__unstable?.resolver) });
  const ruleset = configureRuleset(parser);
  spectral.setRuleset(ruleset);
  return spectral;
}

function configureRuleset(parser: Parser): RulesetDefinition {
  return {
    extends: [aasRuleset],
    rules: {
      'asyncapi-is-asyncapi': asyncApi2IsAsyncApi(),
      'asyncapi-schemas-v2': asyncApi2SchemaParserRule(parser),
      // operationId is an optional field
      'asyncapi-operation-operationId': 'warn',
      // We do not use these rules from the official ruleset due to the fact 
      // that the given rules validate only AsyncAPI Schemas and prevent defining schemas in other formats 
      'asyncapi-payload-unsupported-schemaFormat': 'off',
      'asyncapi-payload': 'off',
    },
  } as RulesetDefinition;
}

function asyncApi2IsAsyncApi(): RuleDefinition {
  return {
    description: 'The input must be a document with a supported version of AsyncAPI.',
    formats: [() => true], // run rule for all inputs
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
        (targetVal) => {
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
  };
}