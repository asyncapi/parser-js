import { applyTraitsV2, applyTraitsV3 } from './apply-traits';
import { checkCircularRefs } from './check-circular-refs';
import { parseSchemasV2 } from './parse-schema';
import { anonymousNaming } from './anonymous-naming';

import type { Parser } from '../parser';
import type { ParseOptions } from '../parse';
import type { AsyncAPIDocumentInterface } from '../models';
import type { DetailedAsyncAPI } from '../types';
import type { v2, v3 } from '../spec-types';

export async function customOperations(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, options: ParseOptions): Promise<void> {
  switch (detailed.semver.major) {
  case 2: return operationsV2(parser, document, detailed, options);
  case 3: return operationsV3(parser, document, detailed, options);
  }
}

async function operationsV2(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, options: ParseOptions): Promise<void> {
  checkCircularRefs(document);

  if (options.applyTraits) {
    applyTraitsV2(detailed.parsed as v2.AsyncAPIObject);
  }
  if (options.parseSchemas) {
    await parseSchemasV2(parser, detailed);
  }
  anonymousNaming(document);
}

async function operationsV3(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, options: ParseOptions): Promise<void> {
  checkCircularRefs(document);

  if (options.applyTraits) {
    applyTraitsV3(detailed.parsed as v3.AsyncAPIObject);
  }
  // TODO: Support schema parsing in v3
  // if (options.parseSchemas) {
  //   await parseSchemasV2(parser, detailed);
  // }
  anonymousNaming(document);
}
