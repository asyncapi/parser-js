var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JSONPath } from 'jsonpath-plus';
import { xParserOriginalPayload } from '../constants';
import { parseSchema, getSchemaFormat, getDefaultSchemaFormat } from '../schema-parser';
const customSchemasPathsV2 = [
    // operations
    '$.channels.*.[publish,subscribe].message',
    '$.channels.*.[publish,subscribe].message.oneOf.*',
    '$.components.channels.*.[publish,subscribe].message',
    '$.components.channels.*.[publish,subscribe].message.oneOf.*',
    // messages
    '$.components.messages.*',
];
export function parseSchemasV2(parser, detailed) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultSchemaFormat = getDefaultSchemaFormat(detailed.semver.version);
        const parseItems = [];
        const visited = new Set();
        customSchemasPathsV2.forEach(path => {
            JSONPath({
                path,
                json: detailed.parsed,
                resultType: 'all',
                callback(result) {
                    const value = result.value;
                    if (visited.has(value)) {
                        return;
                    }
                    visited.add(value);
                    const payload = value.payload;
                    if (!payload) {
                        return;
                    }
                    const schemaFormat = getSchemaFormat(value.schemaFormat, detailed.semver.version);
                    parseItems.push({
                        input: {
                            asyncapi: detailed,
                            data: payload,
                            meta: {
                                message: value,
                            },
                            path: [...splitPath(result.path), 'payload'],
                            schemaFormat,
                            defaultSchemaFormat,
                        },
                        value,
                    });
                },
            });
        });
        return Promise.all(parseItems.map(item => parseSchemaV2(parser, item)));
    });
}
function parseSchemaV2(parser, item) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalData = item.input.data;
        const parsedData = item.value.payload = yield parseSchema(parser, item.input);
        // save original payload only when data is different (returned by custom parsers)
        if (originalData !== parsedData) {
            item.value[xParserOriginalPayload] = originalData;
        }
    });
}
function splitPath(path) {
    // remove $[' from beginning and '] at the end and split by ']['
    return path.slice(3).slice(0, -2).split('\'][\'');
}
