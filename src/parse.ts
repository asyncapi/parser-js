import { AsyncAPIDocumentInterface, ParserAPIVersion } from './models';

import { applyUniqueIds, customOperations } from './custom-operations';
import { validate } from './validate';
import { copy } from './stringify';
import { createAsyncAPIDocument } from './document';
import { createDetailedAsyncAPI, mergePatch, setExtension, createUncaghtDiagnostic } from './utils';

import { xParserSpecParsed, xParserApiVersion } from './constants';

import type { Spectral, Document, RulesetFunctionContext } from '@stoplight/spectral-core';
import type { Parser } from './parser';
import type { ResolverOptions } from './resolver';
import type { ValidateOptions } from './validate';
import type { Input, Diagnostic, DetailedAsyncAPI } from './types';

export interface ParseOutput {
  document: AsyncAPIDocumentInterface | undefined;
  diagnostics: Diagnostic[];
  extras?: {
    document: Document;
  }
}

export interface ParseOptions {
  source?: string;
  applyTraits?: boolean;
  parseSchemas?: boolean;
  validateOptions?: Omit<ValidateOptions, 'source'>;
  __unstable?: {
    resolver?: Omit<ResolverOptions, 'cache'>;
  };
}

const defaultOptions: ParseOptions = {
  applyTraits: true,
  parseSchemas: true,
  validateOptions: {},
  __unstable: {},
};
import yaml from 'js-yaml';
export async function parse(parser: Parser, spectral: Spectral, asyncapi: Input, options: ParseOptions = {}): Promise<ParseOutput> {
  let spectralDocument: Document | undefined;

  try {
    options = mergePatch<ParseOptions>(defaultOptions, options);
    // Normalize input to always be JSON 
    let loadedObj;
    if (typeof asyncapi === 'string') {
      try {
        loadedObj = yaml.load(asyncapi);
      } catch (e) {
        loadedObj = JSON.parse(asyncapi);
      }
    } else {
      loadedObj = asyncapi;
    }
    // Apply unique ids before resolving references
    applyUniqueIds(loadedObj);
    const { validated, diagnostics, extras } = await validate(parser, spectral, loadedObj, { ...options.validateOptions, source: options.source, __unstable: options.__unstable });
    if (validated === undefined) {
      return {
        document: undefined,
        diagnostics,
        extras
      };
    }

    spectralDocument = extras.document;
    const inventory: RulesetFunctionContext['documentInventory'] = (spectralDocument as any).__documentInventory;
  
    // unfreeze the object - Spectral makes resolved document "freezed" 
    const validatedDoc = copy(validated as Record<string, any>);
    const detailed = createDetailedAsyncAPI(validatedDoc, loadedObj as DetailedAsyncAPI['input'], options.source);
    const document = createAsyncAPIDocument(detailed);
    setExtension(xParserSpecParsed, true, document);
    setExtension(xParserApiVersion, ParserAPIVersion, document);
    await customOperations(parser, document, detailed, inventory, options);
    
    return { 
      document,
      diagnostics,
      extras,
    };
  } catch (err: unknown) {
    return { document: undefined, diagnostics: createUncaghtDiagnostic(err, 'Error thrown during AsyncAPI document parsing', spectralDocument), extras: undefined };
  }
}
