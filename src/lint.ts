import { Document } from '@stoplight/spectral-core';
import { Yaml } from '@stoplight/spectral-parsers';
import { toAsyncAPIDocument, normalizeInput, hasWarningDiagnostic, hasErrorDiagnostic } from './utils';

import type { IRunOpts } from '@stoplight/spectral-core';
import type { Parser } from './parser';
import type { AsyncAPIDocumentInterface } from './models/asyncapi';
import type { ParseInput } from './parse';
import type { Diagnostic } from './types';

export interface LintOptions extends IRunOpts {
  path?: string;
}

export interface ValidateOptions extends IRunOpts {
  path?: string;
  allowedSeverity?: {
    warning?: boolean;
  };
}

export interface ValidateOutput {
  validated: unknown;
  diagnostics: Diagnostic[];
}

export async function lint(parser: Parser, asyncapi: ParseInput, options?: LintOptions): Promise<Diagnostic[]> {
  const result = await validate(parser, asyncapi, options);
  return result.diagnostics;
}

export async function validate(parser: Parser, asyncapi: ParseInput, options: ValidateOptions = {}): Promise<ValidateOutput> {
  if (toAsyncAPIDocument(asyncapi)) {
    return {
      validated: asyncapi,
      diagnostics: [],
    };
  }

  const stringifiedDocument = normalizeInput(asyncapi as Exclude<ParseInput, AsyncAPIDocumentInterface>);
  const document = new Document(stringifiedDocument, Yaml, options.path);

  const { allowedSeverity } = normalizeOptions(options);
  // eslint-disable-next-line prefer-const
  let { resolved, results } = await parser.spectral.runWithResolved(document);

  if (
    hasErrorDiagnostic(results) ||
    (!allowedSeverity?.warning && hasWarningDiagnostic(results))
  ) {
    resolved = undefined;
  }

  return { validated: resolved, diagnostics: results };
}

const defaultOptions: ValidateOptions = {
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
