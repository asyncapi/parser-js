var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { customOperations } from './custom-operations';
import { validate } from './validate';
import { copy } from './stringify';
import { createAsyncAPIDocument } from './document';
import { createDetailedAsyncAPI, mergePatch, setExtension } from './utils';
import { xParserSpecParsed } from './constants';
const defaultOptions = {
    applyTraits: true,
    parseSchemas: true,
    validateOptions: {},
};
export function parse(parser, spectral, asyncapi, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        options = mergePatch(defaultOptions, options);
        const { validated, diagnostics } = yield validate(spectral, asyncapi, Object.assign(Object.assign({}, options.validateOptions), { source: options.source }));
        if (validated === undefined) {
            return {
                document: undefined,
                diagnostics,
            };
        }
        // unfreeze the object - Spectral makes resolved document "freezed" 
        const validatedDoc = copy(validated);
        const detailed = createDetailedAsyncAPI(asyncapi, validatedDoc);
        const document = createAsyncAPIDocument(detailed);
        setExtension(xParserSpecParsed, true, document);
        yield customOperations(parser, document, detailed, options);
        return {
            document,
            diagnostics,
        };
    });
}
