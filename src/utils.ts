import { Document } from '@stoplight/spectral-core';
import { DiagnosticSeverity } from '@stoplight/types';

import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { BaseModel } from './models';
import type { AsyncAPISemver, AsyncAPIObject, DetailedAsyncAPI, MaybeAsyncAPI, Diagnostic } from './types';

export function createDetailedAsyncAPI(parsed: AsyncAPIObject, input: string | MaybeAsyncAPI | AsyncAPIObject, source?: string): DetailedAsyncAPI {
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

export function setExtension(id: string, value: any, model: BaseModel): void {
  id = id.startsWith('x-') ? id : `x-${id}`;
  const data = model.json();
  data[id] = value;
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
  return jsonPath.split('/').map(untilde);
}

export function createUncaghtDiagnostic(err: unknown, message: string, document?: Document): Diagnostic[] {
  if (err instanceof Error) {
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
  return [];
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

export function retrievePossibleRef(data: any, pathOfData: string, spec: any = {}): any {
  if (!hasRef(data)) {
    return data;
  }

  const refPath = serializePath(data.$ref);
  if (pathOfData.startsWith(refPath)) { // starts by given path
    return retrieveDeepData(spec, splitPath(refPath)) || data;
  } else if (pathOfData.includes(refPath)) { // circular path in substring of path
    const substringPath = pathOfData.split(refPath)[0];
    return retrieveDeepData(spec, splitPath(`${substringPath}${refPath}`)) || data;
  }
  return data;
}

function retrieveDeepData(value: Record<string, any>, path: string[]) {
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
