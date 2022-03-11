import { applyTraitsV2, applyTraitsV3 } from './apply-traits';
import { parseSchemasV2 } from './parse-schema';

import type { ParseOptions } from "../parse";
import type { DetailedAsyncAPI } from "../types";

export async function customOperations(detailed: DetailedAsyncAPI, options: ParseOptions): Promise<void> {
  switch (detailed.semver.major) {
    case 2: return operationsV2(detailed, options);
    case 3: return operationsV3(detailed, options);
  }
}

async function operationsV2(detailed: DetailedAsyncAPI, options: ParseOptions): Promise<void> {
  if (options.applyTraits) {
    applyTraitsV2(detailed.parsed);
  }
  if (options.parseSchemas) {
    await parseSchemasV2(detailed);
  }
}

async function operationsV3(detailed: DetailedAsyncAPI, options: ParseOptions): Promise<void> {
  if (options.applyTraits) {
    applyTraitsV3(detailed.parsed);
  }
}