"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const custom_operations_1 = require("./custom-operations");
const validate_1 = require("./validate");
const stringify_1 = require("./stringify");
const document_1 = require("./document");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const defaultOptions = {
    applyTraits: true,
    parseSchemas: true,
    validateOptions: {},
};
function parse(parser, spectral, asyncapi, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        options = (0, utils_1.mergePatch)(defaultOptions, options);
        const { validated, diagnostics } = yield (0, validate_1.validate)(spectral, asyncapi, Object.assign(Object.assign({}, options.validateOptions), { source: options.source }));
        if (validated === undefined) {
            return {
                document: undefined,
                diagnostics,
            };
        }
        // unfreeze the object - Spectral makes resolved document "freezed" 
        const validatedDoc = (0, stringify_1.copy)(validated);
        const detailed = (0, utils_1.createDetailedAsyncAPI)(asyncapi, validatedDoc);
        const document = (0, document_1.createAsyncAPIDocument)(detailed);
        (0, utils_1.setExtension)(constants_1.xParserSpecParsed, true, document);
        yield (0, custom_operations_1.customOperations)(parser, document, detailed, options);
        return {
            document,
            diagnostics,
        };
    });
}
exports.parse = parse;
