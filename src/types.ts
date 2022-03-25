import type { ISpectralDiagnostic, IFunctionResult } from '@stoplight/spectral-core';
import type { AsyncAPIDocumentInterface } from './models/asyncapi';

export type MaybeAsyncAPI = { asyncapi: string } & Record<string, unknown>;
export interface AsyncAPISemver {
  version: string;
  major: number;
  minor: number;
  patch: number;
  rc?: number;
}

export interface DetailedAsyncAPI {
  source: string | Record<string, any>;
  parsed: Record<string, any>;
  semver: AsyncAPISemver;
}

export type ParserInput = string | MaybeAsyncAPI | AsyncAPIDocumentInterface;

export type Diagnostic = ISpectralDiagnostic;
export type SchemaValidateResult = IFunctionResult;

export interface ParserOutput {
  source: ParserInput;
  parsed: AsyncAPIDocumentInterface | undefined;
  diagnostics: Diagnostic[]; 
}

export interface Constructor<T> {
  new (...args: any[]): T
}