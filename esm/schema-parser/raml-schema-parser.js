var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import yaml from 'js-yaml';
import * as lib from 'webapi-parser';
/* eslint-disable */
const wap = lib.WebApiParser;
const r2j = require('ramldt2jsonschema');
export function RamlSchemaParser() {
    return {
        validate,
        parse,
        getMimeTypes,
    };
}
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
        return `#%RAML 1.0 Library\n${yaml.dump({ types: { tmpType: payload } })}`;
    }
    return payload;
}
