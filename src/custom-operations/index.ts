import { applyTraitsV2, applyTraitsV3 } from './apply-traits';
import { resolveCircularRefs } from './resolve-circular-refs';
import { parseSchemasV2, parseSchemasV3 } from './parse-schema';
import { anonymousNaming } from './anonymous-naming';
import { checkCircularRefs } from './check-circular-refs';

import type { RulesetFunctionContext } from '@stoplight/spectral-core';
import type { Parser } from '../parser';
import type { ParseOptions } from '../parse';
import type { AsyncAPIDocumentInterface } from '../models';
import type { DetailedAsyncAPI } from '../types';
import type { v2, v3 } from '../spec-types';

export {applyUniqueIds} from './apply-unique-ids';
export async function customOperations(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, inventory: RulesetFunctionContext['documentInventory'], options: ParseOptions): Promise<void> {
  switch (detailed.semver.major) {
  case 2: return operationsV2(parser, document, detailed, inventory, options);
  case 3: return operationsV3(parser, document, detailed, inventory, options);
  }
}

async function operationsV2(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, inventory: RulesetFunctionContext['documentInventory'], options: ParseOptions): Promise<void> {
  checkCircularRefs(document);

  if (options.applyTraits) {
    applyTraitsV2(detailed.parsed as v2.AsyncAPIObject);
  }
  if (options.parseSchemas) {
    await parseSchemasV2(parser, detailed);
  }

  // anonymous naming and resolving circular references should be done after custom schemas parsing
  if (inventory) {
    resolveCircularRefs(document, inventory);
  }
  anonymousNaming(document);
}

async function operationsV3(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, inventory: RulesetFunctionContext['documentInventory'], options: ParseOptions): Promise<void> {
  checkCircularRefs(document);

  if (options.applyTraits) {
    applyTraitsV3(detailed.parsed as v3.AsyncAPIObject);
  }
  if (options.parseSchemas) {
    await parseSchemasV3(parser, detailed);
  }
  // anonymous naming and resolving circular references should be done after custom schemas parsing
  if (inventory) {
    resolveCircularRefs(document, inventory);
  }
  anonymousNaming(document);
}
