import { applyTraitsV2 } from './apply-traits';
import { resolveCircularRefs } from './resolve-circular-refs';
import { parseSchemasV2 } from './parse-schema';
import { anonymousNaming } from './anonymous-naming';

import type { RulesetFunctionContext } from '@stoplight/spectral-core';
import type { Parser } from '../parser';
import type { ParseOptions } from '../parse';
import type { AsyncAPIDocumentInterface } from '../models';
import type { DetailedAsyncAPI } from '../types';

export async function customOperations(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, inventory: RulesetFunctionContext['documentInventory'], options: ParseOptions): Promise<void> {
  switch (detailed.semver.major) {
  case 2: return operationsV2(parser, document, detailed, inventory, options);
  // case 3: return operationsV3(parser, document, detailed, options);
  }
}

async function operationsV2(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, inventory: RulesetFunctionContext['documentInventory'], options: ParseOptions): Promise<void> {
  if (options.applyTraits) {
    applyTraitsV2(detailed.parsed);
  }
  if (options.parseSchemas) {
    await parseSchemasV2(parser, detailed);
  }

  // anonymous naming and checking circular refrences should be done after custom schemas parsing
  if (inventory) {
    resolveCircularRefs(document, inventory);
  }
  anonymousNaming(document);
}

