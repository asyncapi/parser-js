import {
  IConstructorOpts,
  ISpectralDiagnostic,
  IRunOpts,
  Spectral,
  Ruleset,
  RulesetDefinition,
} from "@stoplight/spectral-core";
import { asyncapi as aasRuleset } from "@stoplight/spectral-rulesets";

import { toAsyncAPIDocument, normalizeInput, hasWarningDiagnostic, hasErrorDiagnostic } from "./utils";

import type { AsyncAPIDocument } from "./models/asyncapi";
import type { ParserInput } from "./types";

export interface LintOptions extends IConstructorOpts, IRunOpts {
  ruleset?: RulesetDefinition | Ruleset;
}

export interface ValidateOptions extends LintOptions {
  allowedSeverity?: {
    warning?: boolean;
  };
}

export interface ValidateOutput {
  validated: unknown;
  diagnostics: ISpectralDiagnostic[];
}

export async function lint(asyncapi: ParserInput, options?: LintOptions): Promise<ISpectralDiagnostic[] | undefined> {
  if (toAsyncAPIDocument(asyncapi)) {
    return;
  }
  const document = normalizeInput(asyncapi as Exclude<ParserInput, AsyncAPIDocument>);
  return (await validate(document, options)).diagnostics;
}

export async function validate(asyncapi: string, options?: ValidateOptions): Promise<ValidateOutput> {
  const { ruleset, allowedSeverity, ...restOptions } = normalizeOptions(options);
  const spectral = new Spectral(restOptions);

  spectral.setRuleset(ruleset!);
  let { resolved, results } = await spectral.runWithResolved(asyncapi);

  if (
    hasErrorDiagnostic(results) ||
    (!allowedSeverity?.warning && hasWarningDiagnostic(results))
  ) {
    resolved = undefined;
  }

  return { validated: resolved, diagnostics: results };
}

const defaultOptions: ValidateOptions = {
  // TODO: fix that type
  ruleset: aasRuleset as any,
  allowedSeverity: {
    warning: true,
  }
};
function normalizeOptions(options?: ValidateOptions): ValidateOptions {
  if (!options || typeof options !== 'object') {
    return defaultOptions;
  }
  // shall copy
  options = { ...defaultOptions, ...options };

  // severity
  options.allowedSeverity = { ...defaultOptions.allowedSeverity, ...(options.allowedSeverity || {}) };

  return options;
}
