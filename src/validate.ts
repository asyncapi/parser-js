import { Document } from '@stoplight/spectral-core';
import { Yaml } from '@stoplight/spectral-parsers';
import { normalizeInput, mergePatch, hasErrorDiagnostic, hasWarningDiagnostic, hasInfoDiagnostic, hasHintDiagnostic } from './utils';

import type { Spectral, IRunOpts } from '@stoplight/spectral-core';
import type { AsyncAPIDocumentInterface } from './models';
import type { Input, Diagnostic } from './types';

export interface ValidateOptions extends IRunOpts {
  source?: string;
  allowedSeverity?: {
    warning?: boolean;
    info?: boolean;
    hint?: boolean;
  };
}

export interface ValidateOutput {
  validated: unknown;
  diagnostics: Diagnostic[];
}

const defaultOptions: ValidateOptions = {
  allowedSeverity: {
    warning: true,
    info: true,
    hint: true,
  }
};

export async function validate(spectral: Spectral, asyncapi: Input, options: ValidateOptions = {}): Promise<ValidateOutput> {
  const { allowedSeverity } = mergePatch<ValidateOptions>(defaultOptions, options);
  const stringifiedDocument = normalizeInput(asyncapi as Exclude<Input, AsyncAPIDocumentInterface>);
  const document = new Document(stringifiedDocument, Yaml, options.source);

  // eslint-disable-next-line prefer-const
  let { resolved: validated, results } = await spectral.runWithResolved(document);

  if (
    hasErrorDiagnostic(results) ||
    (!allowedSeverity?.warning && hasWarningDiagnostic(results)) ||
    (!allowedSeverity?.info && hasInfoDiagnostic(results)) ||
    (!allowedSeverity?.hint && hasHintDiagnostic(results))
  ) {
    validated = undefined;
  }

  return { validated, diagnostics: results };
}
