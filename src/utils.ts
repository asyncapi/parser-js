import { DiagnosticSeverity } from '@stoplight/types';
import { AsyncAPIDocument } from './models';
import { unstringify } from './stringify';

import { 
  xParserSpecParsed,
  xParserSpecStringified,
} from './constants';

import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { MaybeAsyncAPI } from 'types';

export function toAsyncAPIDocument(maybeDoc: unknown): AsyncAPIDocument | undefined {
  if (isAsyncAPIDocument(maybeDoc)) {
    return maybeDoc;
  }
  if (!isParsedDocument(maybeDoc)) {
    return;
  }
  return unstringify(maybeDoc) || new AsyncAPIDocument(maybeDoc);
}

export function isAsyncAPIDocument(maybeDoc: unknown): maybeDoc is AsyncAPIDocument {
  return maybeDoc instanceof AsyncAPIDocument;
}

export function isParsedDocument(maybeDoc: unknown): maybeDoc is Record<string, unknown> {
  if (typeof maybeDoc !== 'object' || maybeDoc === null) {
    return false;
  }
  return Boolean((maybeDoc as Record<string, unknown>)[xParserSpecParsed]);
}

export function isStringifiedDocument(maybeDoc: unknown): maybeDoc is Record<string, unknown> {
  if (typeof maybeDoc !== 'object' || maybeDoc === null) {
    return false;
  }
  return (
    Boolean((maybeDoc as Record<string, unknown>)[xParserSpecParsed]) &&
    Boolean((maybeDoc as Record<string, unknown>)[xParserSpecStringified])
  );
}

export function normalizeInput(asyncapi: string | MaybeAsyncAPI): string {
  return JSON.stringify(asyncapi, undefined, 2);
};

export function hasErrorDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean {
  return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Error);
}

export function hasWarningDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean {
  return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Warning);
}
