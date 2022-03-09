import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { AsyncAPIDocumentInterface } from './models/asyncapi';

export type MaybeAsyncAPI = { asyncapi: unknown } & Record<string, unknown>;
export type ParserInput = string | MaybeAsyncAPI | AsyncAPIDocumentInterface;

export type Diagnostic = ISpectralDiagnostic;

export interface ParserOutput {
  source: ParserInput;
  parsed: AsyncAPIDocumentInterface | undefined;
  diagnostics: Diagnostic[]; 
}
