import { Document } from '@stoplight/spectral-core';
import { Yaml } from '@stoplight/spectral-parsers';
import { createSpectral } from './spectral';
import { normalizeInput, mergePatch, hasErrorDiagnostic, hasWarningDiagnostic, hasInfoDiagnostic, hasHintDiagnostic, createUncaghtDiagnostic } from './utils';

import type { Spectral, IRunOpts } from '@stoplight/spectral-core';
import type { Parser } from './parser';
import type { ResolverOptions } from './resolver';
import type { AsyncAPIDocumentInterface } from './models';
import type { Input, Diagnostic } from './types';

export interface ValidateOptions extends IRunOpts {
  source?: string;
  allowedSeverity?: {
    error?: boolean;
    warning?: boolean;
    info?: boolean;
    hint?: boolean;
  };
  __unstable?: {
    resolver?: Omit<ResolverOptions, 'cache'>;
  };
}

export interface ValidateOutput {
  validated: unknown;
  diagnostics: Diagnostic[];
  extras: {
    document: Document;
  }
}

const defaultOptions: ValidateOptions = {
  allowedSeverity: {
    error: false,
    warning: true,
    info: true,
    hint: true,
  },
  __unstable: {},
};

export async function validate(parser: Parser, parserSpectral: Spectral, asyncapi: Input, options: ValidateOptions = {}): Promise<ValidateOutput> {
  let document: Document | undefined;
  
  try {
    const { allowedSeverity } = mergePatch<ValidateOptions>(defaultOptions, options);
    const stringifiedDocument = normalizeInput(asyncapi as Exclude<Input, AsyncAPIDocumentInterface>);
    document = new Document(stringifiedDocument, Yaml, options.source) as Document;
    // add input data (asyncapi argument) to the document to reuse it in rules
    (document as any).__parserInput = asyncapi;
  
    const spectral = options.__unstable?.resolver ? createSpectral(parser, options) : parserSpectral;
    // eslint-disable-next-line prefer-const
    let { resolved: validated, results } = await spectral.runWithResolved(document, {  });
  
    if (
      (!allowedSeverity?.error && hasErrorDiagnostic(results)) ||
      (!allowedSeverity?.warning && hasWarningDiagnostic(results)) ||
      (!allowedSeverity?.info && hasInfoDiagnostic(results)) ||
      (!allowedSeverity?.hint && hasHintDiagnostic(results))
    ) {
      validated = undefined;
    }
  
    return { validated, diagnostics: results, extras: { document: document as Document } };
  } catch (err: unknown) {
    return { validated: undefined, diagnostics: createUncaghtDiagnostic(err, 'Error thrown during AsyncAPI document validation', document), extras: { document: document as Document } };
  }
}
