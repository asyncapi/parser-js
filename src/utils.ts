import { Document } from '@stoplight/spectral-core';
import { DiagnosticSeverity } from '@stoplight/types';

import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { BaseModel } from './models';
import type { AsyncAPISemver, AsyncAPIObject, DetailedAsyncAPI, MaybeAsyncAPI, Diagnostic } from './types';

export function createDetailedAsyncAPI(parsed: AsyncAPIObject, input?: string | MaybeAsyncAPI | AsyncAPIObject, source?: string): DetailedAsyncAPI {
  return {
    source,
    input,
    parsed,
    semver: getSemver(parsed.asyncapi),
  };
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
  if (typeof asyncapi === 'string') {
    return asyncapi;
  }
  return JSON.stringify(asyncapi, undefined, 2);
}

export function hasErrorDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean {
  return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Error);
}

export function hasWarningDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean {
  return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Warning);
}

export function hasInfoDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean {
  return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Information);
}

export function hasHintDiagnostic(diagnostics: ISpectralDiagnostic[]): boolean {
  return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Hint);
}

export function setExtension(id: string, value: unknown, model: BaseModel): void {
  const modelValue = model.json();
  if (typeof modelValue === 'object' && modelValue) {
    id = id.startsWith('x-') ? id : `x-${id}`;
    modelValue[String(id)] = value;
  }
}

export function mergePatch<T = any>(origin: unknown, patch: unknown): T {
  // If the patch is not an object, it replaces the origin.
  if (!isObject(patch)) {
    return patch as T;
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
  return result as T;
}

export function isObject(value: unknown): value is Record<string, any> {
  return Boolean(value) && typeof value === 'object' && Array.isArray(value) === false;
}

export function hasRef(value: unknown): value is { $ref: string } {
  return isObject(value) && '$ref' in value && typeof value.$ref === 'string';
}

export function toJSONPathArray(jsonPath: string): Array<string | number> {
  return splitPath(serializePath(jsonPath));
}

export function createUncaghtDiagnostic(err: unknown, message: string, document?: Document): Diagnostic[] {
  if (!(err instanceof Error)) {
    return [];
  }
  
  const range: Diagnostic['range'] = document ? document.getRangeForJsonPath([]) as Diagnostic['range'] : Document.DEFAULT_RANGE;
  return [
    {
      code: 'uncaught-error',
      message: `${message}. Name: ${err.name}, message: ${err.message}, stack: ${err.stack}`,
      path: [],
      severity: DiagnosticSeverity.Error,
      range,
    }
  ];  
}
export function tilde(str: string) {
  return str.replace(/[~/]{1}/g, (sub) => {
    switch (sub) {
    case '/': return '~1';
    case '~': return '~0';
    }
    return sub;
  });
}

export function untilde(str: string) {
  if (!str.includes('~')) return str;
  return str.replace(/~[01]/g, (sub) => {
    switch (sub) {
    case '~1': return '/';
    case '~0': return '~';
    }
    return sub;
  });
}

export function findSubArrayIndex(arr: Array<any>, subarr: Array<any>, fromIndex = 0) {
  let i, found, j;
  for (i = fromIndex; i < 1 + (arr.length - subarr.length); ++i) {
    found = true;
    for (j = 0; j < subarr.length; ++j) {
      if (arr[i + j] !== subarr[j]) {
        found = false;
        break;
      }
    }
    if (found) {
      return i;
    }
  }
  return -1;
}

export function retrieveDeepData(value: Record<string, any>, path: Array<string | number>) {
  let index = 0;
  const length = path.length;

  while (typeof value === 'object' && value && index < length) {
    value = value[path[index++]];
  }
  return index === length ? value : undefined;
}

function serializePath(path: string) {
  if (path.startsWith('#')) return path.substring(1);
  return path;
}

function splitPath(path: string): string[] {
  return path.split('/').filter(Boolean).map(untilde);
}
