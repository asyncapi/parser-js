var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ParserAPIVersion } from './models';
import { applyUniqueIds, customOperations } from './custom-operations';
import { validate } from './validate';
import { copy } from './stringify';
import { createAsyncAPIDocument } from './document';
import { createDetailedAsyncAPI, mergePatch, setExtension, createUncaghtDiagnostic } from './utils';
import { xParserSpecParsed, xParserApiVersion } from './constants';
const defaultOptions = {
    applyTraits: true,
    parseSchemas: true,
    validateOptions: {},
    __unstable: {},
};
import yaml from 'js-yaml';
export function parse(parser, spectral, asyncapi, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let spectralDocument;
        try {
            options = mergePatch(defaultOptions, options);
            // Normalize input to always be JSON 
            let loadedObj;
            if (typeof asyncapi === 'string') {
                try {
                    loadedObj = yaml.load(asyncapi);
                }
                catch (e) {
                    loadedObj = JSON.parse(asyncapi);
                }
            }
            else {
                loadedObj = asyncapi;
            }
            const { validated, diagnostics, extras } = yield validate(parser, spectral, loadedObj, Object.assign(Object.assign({}, options.validateOptions), { source: options.source, __unstable: options.__unstable }));
            if (validated === undefined) {
                return {
                    document: undefined,
                    diagnostics,
                    extras
                };
            }
            spectralDocument = extras.document;
            const inventory = spectralDocument.__documentInventory;
            // unfreeze the object - Spectral makes resolved document "freezed" 
            const validatedDoc = copy(validated);
            // Apply unique ids which are used as part of iterating between channels <-> operations <-> messages
            applyUniqueIds(validatedDoc);
            const detailed = createDetailedAsyncAPI(validatedDoc, loadedObj, options.source);
            const document = createAsyncAPIDocument(detailed);
            setExtension(xParserSpecParsed, true, document);
            setExtension(xParserApiVersion, ParserAPIVersion, document);
            yield customOperations(parser, document, detailed, inventory, options);
            return {
                document,
                diagnostics,
                extras,
            };
        }
        catch (err) {
            return { document: undefined, diagnostics: createUncaghtDiagnostic(err, 'Error thrown during AsyncAPI document parsing', spectralDocument), extras: undefined };
        }
    });
}
