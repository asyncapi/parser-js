import type { ISpectralDiagnostic, IFunctionResult } from '@stoplight/spectral-core';
import type { v2 } from './spec-types';

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
  parsed: AsyncAPIObject;
  semver: AsyncAPISemver;
}

export type Diagnostic = ISpectralDiagnostic;
export type SchemaValidateResult = IFunctionResult;
export type AsyncAPIObject = v2.AsyncAPIObject;
export type AsyncAPISchema = v2.AsyncAPISchemaObject;
