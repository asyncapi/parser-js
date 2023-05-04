import { Spectral } from '@stoplight/spectral-core';

import { createRuleset } from './ruleset';
import { createResolver } from './resolver';

import type { Parser, ParserOptions } from './parser';

export function createSpectral(parser: Parser, options: ParserOptions = {}): Spectral {
  const resolverOptions = options.__unstable?.resolver;
  const spectral = new Spectral({ resolver: createResolver(resolverOptions) });
  const ruleset = createRuleset(parser, options.ruleset);
  spectral.setRuleset(ruleset);
  return spectral;
}
