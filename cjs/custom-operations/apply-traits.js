"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyTraitsV3 = exports.applyTraitsV2 = void 0;
const jsonpath_plus_1 = require("jsonpath-plus");
const utils_1 = require("../utils");
const v2TraitPaths = [
    // operations
    '$.channels.*.[publish,subscribe]',
    '$.components.channels.*.[publish,subscribe]',
    // messages
    '$.channels.*.[publish,subscribe].message',
    '$.channels.*.[publish,subscribe].message.oneOf.*',
    '$.components.channels.*.[publish,subscribe].message',
    '$.components.channels.*.[publish,subscribe].message.oneOf.*',
    '$.components.messages.*',
];
function applyTraitsV2(asyncapi) {
    applyAllTraits(asyncapi, v2TraitPaths);
}
exports.applyTraitsV2 = applyTraitsV2;
const v3TraitPaths = [
    // operations
    '$.channels.*.[publish,subscribe]',
    '$.components.channels.*.[publish,subscribe]',
    // messages
    '$.channels.*.[publish,subscribe].message',
    '$.channels.*.[publish,subscribe].message.oneOf.*',
    '$.components.channels.*.[publish,subscribe].message',
    '$.components.channels.*.[publish,subscribe].message.oneOf.*',
    '$.components.messages.*',
];
function applyTraitsV3(asyncapi) {
    applyAllTraits(asyncapi, v3TraitPaths);
}
exports.applyTraitsV3 = applyTraitsV3;
function applyAllTraits(asyncapi, paths) {
    paths.forEach(path => {
        (0, jsonpath_plus_1.JSONPath)({
            path,
            json: asyncapi,
            resultType: 'value',
            callback(value) { applyTraits(value); },
        });
    });
}
function applyTraits(value) {
    if (Array.isArray(value.traits)) {
        for (const trait of value.traits) {
            for (const key in trait) {
                value[String(key)] = (0, utils_1.mergePatch)(value[String(key)], trait[String(key)]);
            }
        }
    }
}
