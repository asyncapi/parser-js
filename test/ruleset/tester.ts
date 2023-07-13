import { Parser } from '../../src/parser';

// rulesets
import { coreRuleset, recommendedRuleset } from '../../src/ruleset/ruleset';
import { v2CoreRuleset, v2SchemasRuleset, v2RecommendedRuleset } from '../../src/ruleset/v2';

import type { ParserOptions } from '../../src/parser';
import type { IRuleResult, RulesetDefinition } from '@stoplight/spectral-core';

type RulesetRules<T extends { rules: Record<string, unknown> }> = keyof T['rules'];
type RuleNames = 
  | RulesetRules<typeof coreRuleset> 
  | RulesetRules<typeof recommendedRuleset> 
  | RulesetRules<typeof v2CoreRuleset> 
  | RulesetRules<typeof v2RecommendedRuleset>
  | RulesetRules<ReturnType<typeof v2SchemasRuleset>>

type Scenario = ReadonlyArray<
  Readonly<{
    name: string;
    document: Record<string, unknown>;
    errors: ReadonlyArray<Partial<IRuleResult>>;
  }>
>;

export function testRule(ruleName: RuleNames, tests: Scenario,): void {
  describe(`Rule ${ruleName}`, () => {
    for (const testCase of tests) {
      it(testCase.name, async () => {
        const parser = createParser([ruleName]);
        const doc = JSON.stringify(testCase.document);

        const errors = await parser.validate(doc);
        expect(errors.filter(({ code }) => code === 'uncaught-error')).toHaveLength(0);
        expect(errors.filter(({ code }) => code === ruleName)).toEqual(
          testCase.errors.map(error => expect.objectContaining(error) as unknown),
        );
      });
    }
  });
}

export { DiagnosticSeverity } from '../../src';

function createParser(rules: Array<RuleNames>, options: ParserOptions = {}): Parser {
  const ruleset: RulesetDefinition = {
    extends: [
      [coreRuleset as RulesetDefinition, 'off'],
      [recommendedRuleset as RulesetDefinition, 'off'],
      [v2CoreRuleset as RulesetDefinition, 'off'],
      [v2RecommendedRuleset as RulesetDefinition, 'off'],
    ],
    rules: {
      'asyncapi2-schemas': 'off',
      ...rules.reduce((obj, name) => {
        obj[name] = true;
        return obj;
      }, {})
    },
  };

  return new Parser({ 
    ruleset,
    ...options,
  });
}
