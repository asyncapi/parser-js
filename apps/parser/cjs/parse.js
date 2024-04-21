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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const models_1 = require("./models");
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
    __unstable: {},
};
const js_yaml_1 = __importDefault(require("js-yaml"));
function parse(parser, spectral, asyncapi, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let spectralDocument;
        try {
            options = (0, utils_1.mergePatch)(defaultOptions, options);
            // Normalize input to always be JSON 
            let loadedObj;
            if (typeof asyncapi === 'string') {
                try {
                    loadedObj = js_yaml_1.default.load(asyncapi);
                }
                catch (e) {
                    loadedObj = JSON.parse(asyncapi);
                }
            }
            else {
                loadedObj = asyncapi;
            }
            const { validated, diagnostics, extras } = yield (0, validate_1.validate)(parser, spectral, loadedObj, Object.assign(Object.assign({}, options.validateOptions), { source: options.source, __unstable: options.__unstable }));
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
            const validatedDoc = (0, stringify_1.copy)(validated);
            // Apply unique ids which are used as part of iterating between channels <-> operations <-> messages
            (0, custom_operations_1.applyUniqueIds)(validatedDoc);
            const detailed = (0, utils_1.createDetailedAsyncAPI)(validatedDoc, loadedObj, options.source);
            const document = (0, document_1.createAsyncAPIDocument)(detailed);
            (0, utils_1.setExtension)(constants_1.xParserSpecParsed, true, document);
            (0, utils_1.setExtension)(constants_1.xParserApiVersion, models_1.ParserAPIVersion, document);
            yield (0, custom_operations_1.customOperations)(parser, document, detailed, inventory, options);
            return {
                document,
                diagnostics,
                extras,
            };
        }
        catch (err) {
            return { document: undefined, diagnostics: (0, utils_1.createUncaghtDiagnostic)(err, 'Error thrown during AsyncAPI document parsing', spectralDocument), extras: undefined };
        }
    });
}
exports.parse = parse;
