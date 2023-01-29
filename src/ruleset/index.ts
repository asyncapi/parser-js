import { coreRuleset, recommendedRuleset } from './ruleset';
import { v2CoreRuleset, v2SchemasRuleset, v2RecommendedRuleset } from './v2/ruleset';

import type { Parser, ParserOptions } from '../parser';
import type { RulesetDefinition } from '@stoplight/spectral-core';

export function createRuleset(parser: Parser, options: ParserOptions): RulesetDefinition {
  const optionsRuleset = options.ruleset as any;
  return {
    ...optionsRuleset || {},
    extends: [
      coreRuleset,
      recommendedRuleset,
      v2CoreRuleset,
      v2SchemasRuleset(parser),
      v2RecommendedRuleset,
      ...optionsRuleset?.extends || []
    ],
  } as RulesetDefinition;
}
