import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { SchemaValidateResult } from '../src/types';

export function filterDiagnostics(diagnostics: ISpectralDiagnostic[], code: string) {
  return diagnostics.filter(d => d.code === code);
}

export function filterLastVersionDiagnostics(diagnostics: ISpectralDiagnostic[]) {
  return diagnostics.filter(d => d.code !== 'asyncapi-latest-version');
}

export function expectDiagnostics(diagnostics: ISpectralDiagnostic[], code: string, results: SchemaValidateResult[]) {
  expect(filterDiagnostics(diagnostics, code)).toEqual(results.map(e => expect.objectContaining(e)));
}
