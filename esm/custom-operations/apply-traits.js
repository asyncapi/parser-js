import { JSONPath } from 'jsonpath-plus';
import { mergePatch } from '../utils';
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
export function applyTraitsV2(asyncapi) {
    applyAllTraits(asyncapi, v2TraitPaths);
}
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
export function applyTraitsV3(asyncapi) {
    applyAllTraits(asyncapi, v3TraitPaths);
}
function applyAllTraits(asyncapi, paths) {
    paths.forEach(path => {
        JSONPath({
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
                value[String(key)] = mergePatch(value[String(key)], trait[String(key)]);
            }
        }
    }
}
