import { coreRuleset, recommendedRuleset } from './ruleset';
import { v2CoreRuleset, v2SchemasRuleset, v2RecommendedRuleset } from './v2';

import type { Parser } from '../parser';
import type { RulesetDefinition } from '@stoplight/spectral-core';

export type RulesetOptions = RulesetDefinition & { core?: boolean, recommended?: boolean };

export function createRuleset(parser: Parser, options?: RulesetOptions): RulesetDefinition {
  const { core: useCore = true, recommended: useRecommended = true, ...rest } = options || {};

  const extendedRuleset = [
    useCore && coreRuleset,
    useRecommended && recommendedRuleset,
    useCore && v2CoreRuleset,
    useCore && v2SchemasRuleset(parser),
    useRecommended && v2RecommendedRuleset,
    ...(options as any || {})?.extends || [],
  ].filter(Boolean);

  return {
    ...rest || {},
    extends: extendedRuleset,
  } as RulesetDefinition;
}
