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
    applyAllTraitsV2(asyncapi, v2TraitPaths);
}
exports.applyTraitsV2 = applyTraitsV2;
function applyAllTraitsV2(asyncapi, paths) {
    const visited = new Set();
    paths.forEach(path => {
        (0, jsonpath_plus_1.JSONPath)({
            path,
            json: asyncapi,
            resultType: 'value',
            callback(value) {
                if (visited.has(value)) {
                    return;
                }
                visited.add(value);
                applyTraitsToObjectV2(value);
            },
        });
    });
}
function applyTraitsToObjectV2(value) {
    if (Array.isArray(value.traits)) {
        for (const trait of value.traits) {
            for (const key in trait) {
                value[String(key)] = (0, utils_1.mergePatch)(value[String(key)], trait[String(key)]);
            }
        }
    }
}
const v3TraitPaths = [
    // operations
    '$.operations.*',
    '$.operations.*.channel.*',
    '$.operations.*.channel.messages.*',
    '$.operations.*.messages.*',
    '$.components.operations.*',
    '$.components.operations.*.channel.*',
    '$.components.operations.*.channel.messages.*',
    '$.components.operations.*.messages.*',
    // Channels
    '$.channels.*.messages.*',
    '$.components.channels.*.messages.*',
    // messages
    '$.components.messages.*',
];
function applyTraitsV3(asyncapi) {
    applyAllTraitsV3(asyncapi, v3TraitPaths);
}
exports.applyTraitsV3 = applyTraitsV3;
function applyAllTraitsV3(asyncapi, paths) {
    const visited = new Set();
    paths.forEach(path => {
        (0, jsonpath_plus_1.JSONPath)({
            path,
            json: asyncapi,
            resultType: 'value',
            callback(value) {
                if (visited.has(value)) {
                    return;
                }
                visited.add(value);
                applyTraitsToObjectV3(value);
            },
        });
    });
}
function applyTraitsToObjectV3(value) {
    if (!Array.isArray(value.traits)) {
        return;
    }
    // shallow copy of object
    const copy = Object.assign({}, value);
    // reset the object but preserve the reference
    for (const key in value) {
        delete value[key];
    }
    // merge root object at the end
    for (const trait of [...copy.traits, copy]) {
        for (const key in trait) {
            value[String(key)] = (0, utils_1.mergePatch)(value[String(key)], trait[String(key)]);
        }
    }
}
