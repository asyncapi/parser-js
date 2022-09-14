import { Parser } from './parser';

export * from './models';

export { Parser };
export { stringify, unstringify } from './stringify';
export { fromURL, fromFile } from './from';

export { AsyncAPIDocument as OldAsyncAPIDocument } from './old-api/asyncapi';
export { migrateToOldAPI } from './old-api/migrator';

export type { AsyncAPISemver, Diagnostic, SchemaValidateResult } from './types';
export type { LintOptions, ValidateOptions, ValidateOutput } from './lint';
export type { ParseInput, ParseOptions, ParseOutput } from './parse';
export type { StringifyOptions } from './stringify';
export type { ValidateSchemaInput, ParseSchemaInput, SchemaParser } from './schema-parser';

export default Parser;
