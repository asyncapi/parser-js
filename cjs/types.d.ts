import type { ISpectralDiagnostic, IFunctionResult } from '@stoplight/spectral-core';
import type { AsyncAPIDocumentInterface } from './models';
import type { v2 } from './spec-types';
export declare type MaybeAsyncAPI = {
    asyncapi: string;
} & Record<string, unknown>;
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
export declare type Input = string | MaybeAsyncAPI | AsyncAPIDocumentInterface;
export declare type Diagnostic = ISpectralDiagnostic;
export declare type SchemaValidateResult = IFunctionResult;
export declare type AsyncAPIObject = v2.AsyncAPIObject;
export declare type AsyncAPISchema = v2.AsyncAPISchemaObject;
