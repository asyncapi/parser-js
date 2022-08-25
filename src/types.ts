import type { ISpectralDiagnostic, IFunctionResult } from '@stoplight/spectral-core';
import type { JSONSchema7 } from "json-schema";
import type { v2 } from "./interfaces";

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
  parsed: v2.AsyncAPIObject;
  semver: AsyncAPISemver;
}

export type Diagnostic = ISpectralDiagnostic;
export type SchemaValidateResult = IFunctionResult;
export type AsyncAPISchema = JSONSchema7 & { [key: string]: any };
