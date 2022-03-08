import type { Spectral, IRunOpts } from '@stoplight/spectral-core';
import type { Input, Diagnostic } from './types';
export interface ValidateOptions extends IRunOpts {
    source?: string;
    allowedSeverity?: {
        warning?: boolean;
        info?: boolean;
        hint?: boolean;
    };
}
export interface ValidateOutput {
    validated: unknown;
    diagnostics: Diagnostic[];
}
export declare function validate(spectral: Spectral, asyncapi: Input, options?: ValidateOptions): Promise<ValidateOutput>;
