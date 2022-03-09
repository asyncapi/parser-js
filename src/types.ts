import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { AsyncAPIDocument } from './models/asyncapi';

export type MaybeAsyncAPI = { asyncapi: unknown } & Record<string, unknown>;
export type ParserInput = string | MaybeAsyncAPI | AsyncAPIDocument;

export type Diagnostic = ISpectralDiagnostic;

export interface ParserOutput {
  source: ParserInput;
  parsed: AsyncAPIDocument | undefined;
  diagnostics: Diagnostic[]; 
}
