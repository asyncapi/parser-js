import { DiagnosticSeverity } from '@stoplight/types';
import { newAsyncAPIDocument, AsyncAPIDocumentInterface, AsyncAPIDocumentV2, AsyncAPIDocumentV3 } from './models';
import { unstringify } from './stringify';

import { 
  xParserSpecParsed,
  xParserSpecStringified,
} from './constants';

import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { AsyncAPISemver, DetailedAsyncAPI, MaybeAsyncAPI } from 'types';

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
  return maybeDoc instanceof AsyncAPIDocumentV2 || maybeDoc instanceof AsyncAPIDocumentV3;
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

export function createDetailedAsyncAPI(source: string | Record<string, unknown>, parsed: Record<string, unknown>): DetailedAsyncAPI {
  return {
    source,
    parsed,
    semver: getSemver((parsed as MaybeAsyncAPI).asyncapi),
  }
}

export function getSemver(version: string): AsyncAPISemver {
  const [major, minor, patchWithRc] = version.split('.');
  const [patch, rc] = patchWithRc.split('-rc');
  return {
    version,
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
    rc: rc && Number(rc),
  } as AsyncAPISemver;
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

export function mergePatch(origin: unknown, patch: unknown) {
  // If the patch is not an object, it replaces the origin.
  if (!isObject(patch)) {
    return patch;
  }

  const result = !isObject(origin)
    ? {} // Non objects are being replaced.
    : Object.assign({}, origin); // Make sure we never modify the origin.

  Object.keys(patch).forEach(key => {
    const patchVal = patch[key];
    if (patchVal === null) {
      delete result[key];
    } else {
      result[key] = mergePatch(result[key], patchVal);
    }
  });
  return result;
}

export function isObject(value: unknown): value is Record<string, any> {
  return Boolean(value) && typeof value === 'object' && Array.isArray(value) === false;
}