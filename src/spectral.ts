import { RulesetDefinition } from "@stoplight/spectral-core";
import { asyncapi as aasRuleset } from "@stoplight/spectral-rulesets";

import { aas2schemaParserRule } from './schema-parser/spectral-rule-v2';

import type { Parser } from "./parser";

export function configureSpectral(parser: Parser) {
  const ruleset = configureRuleset(parser);
  parser.spectral.setRuleset(ruleset);
}

function configureRuleset(parser: Parser): RulesetDefinition {
  const rules = {
    ...aasRuleset.rules,
    'asyncapi-schemas-v2': aas2schemaParserRule(parser),
    // We do not use these two given rules from the official ruleset due to the fact that the given rules validate only AsyncAPI Schemas and prevent defining schemas in other formats 
    'asyncapi-payload-unsupported-schemaFormat': undefined,
    'asyncapi-payload': undefined,
  };
  delete rules['asyncapi-payload-unsupported-schemaFormat'];
  delete rules['asyncapi-payload'];

  // official type for RulesetDefinition needs `extends` so we need to convert first to any and then to RulesetDefinition - bug on Spectral side
  return {
    ...aasRuleset,
    rules,
  } as any as RulesetDefinition;
}
