import { DiagnosticSeverity } from '@stoplight/types';
import { newAsyncAPIDocument, AsyncAPIDocumentInterface, V2AsyncAPIDocument, V3AsyncAPIDocument } from './models';
import { unstringify } from './stringify';

import { 
  xParserSpecParsed,
  xParserSpecStringified,
} from './constants';

import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { MaybeAsyncAPI } from 'types';

export function toAsyncAPIDocument(maybeDoc: unknown): AsyncAPIDocumentInterface | undefined {
  if (isAsyncAPIDocument(maybeDoc)) {
    return maybeDoc;
  }
  if (!isParsedDocument(maybeDoc)) {
    return;
  }
  return unstringify(maybeDoc) || newAsyncAPIDocument(maybeDoc);
}

export function isAsyncAPIDocument(maybeDoc: unknown): maybeDoc is AsyncAPIDocumentInterface {
  return maybeDoc instanceof V2AsyncAPIDocument || maybeDoc instanceof V3AsyncAPIDocument;
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
