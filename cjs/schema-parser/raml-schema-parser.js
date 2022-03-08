"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.RamlSchemaParser = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const lib = __importStar(require("webapi-parser"));
/* eslint-disable */
const wap = lib.WebApiParser;
const r2j = require('ramldt2jsonschema');
function RamlSchemaParser() {
    return {
        validate,
        parse,
        getMimeTypes,
    };
}
exports.RamlSchemaParser = RamlSchemaParser;
function parse(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = formatPayload(input.data);
        // Draft 6 is compatible with 7.
        const jsonModel = yield r2j.dt2js(payload, 'tmpType', { draft: '06' });
        return jsonModel.definitions.tmpType;
    });
}
function getMimeTypes() {
    return [
        'application/raml+yaml;version=1.0',
    ];
}
function validate(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = formatPayload(input.data);
        const parsed = yield wap.raml10.parse(payload);
        const report = yield wap.raml10.validate(parsed);
        if (report.conforms) {
            // No errors found.
            return [];
        }
        const validateResult = [];
        report.results.forEach(result => {
            validateResult.push({
                message: result.message,
                path: input.path, // RAML parser doesn't provide a path to the error.
            });
        });
        return validateResult;
    });
}
function formatPayload(payload) {
    if (typeof payload === 'object') {
        return `#%RAML 1.0 Library\n${js_yaml_1.default.dump({ types: { tmpType: payload } })}`;
    }
    return payload;
}
