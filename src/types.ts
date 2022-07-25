import type { ISpectralDiagnostic, IFunctionResult } from '@stoplight/spectral-core';
import { JSONSchema7 }from "json-schema"

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

export type Diagnostic = ISpectralDiagnostic;
export type SchemaValidateResult = IFunctionResult;
export type AsyncAPISchema = JSONSchema7;
