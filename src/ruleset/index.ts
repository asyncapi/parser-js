import { coreRuleset, recommendedRuleset } from './ruleset';
import { v2CoreRuleset, v2RecommendedRuleset } from './v2/ruleset';

import type { Parser, ParserOptions } from '../parser';
import type { RulesetDefinition } from '@stoplight/spectral-core';

export function createRuleset(parser: Parser, options: ParserOptions): RulesetDefinition {
  const optionsRuleset = options.ruleset as any;
  const ruleset: RulesetDefinition = {
    extends: [
      coreRuleset,
      recommendedRuleset,
      v2CoreRuleset,
      v2RecommendedRuleset,
      ...optionsRuleset?.extends || []
    ],
    ...optionsRuleset || {},
  };
  return ruleset;
}
