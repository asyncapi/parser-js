"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievePossibleRef = exports.untilde = exports.tilde = exports.hasRef = exports.isObject = exports.mergePatch = exports.setExtension = exports.hasHintDiagnostic = exports.hasInfoDiagnostic = exports.hasWarningDiagnostic = exports.hasErrorDiagnostic = exports.unfreezeObject = exports.normalizeInput = exports.getSemver = exports.createDetailedAsyncAPI = void 0;
const types_1 = require("@stoplight/types");
function createDetailedAsyncAPI(source, parsed) {
    return {
        source,
        parsed,
        semver: getSemver(parsed.asyncapi),
    };
}
exports.createDetailedAsyncAPI = createDetailedAsyncAPI;
function getSemver(version) {
    const [major, minor, patchWithRc] = version.split('.');
    const [patch, rc] = patchWithRc.split('-rc');
    return {
        version,
        major: Number(major),
        minor: Number(minor),
        patch: Number(patch),
        rc: rc && Number(rc),
    };
}
exports.getSemver = getSemver;
function normalizeInput(asyncapi) {
    if (typeof asyncapi === 'string') {
        return asyncapi;
    }
    return JSON.stringify(asyncapi, undefined, 2);
}
exports.normalizeInput = normalizeInput;
function unfreezeObject(data) {
    return JSON.parse(JSON.stringify(data));
}
exports.unfreezeObject = unfreezeObject;
function hasErrorDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === types_1.DiagnosticSeverity.Error);
}
exports.hasErrorDiagnostic = hasErrorDiagnostic;
function hasWarningDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === types_1.DiagnosticSeverity.Warning);
}
exports.hasWarningDiagnostic = hasWarningDiagnostic;
function hasInfoDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === types_1.DiagnosticSeverity.Information);
}
exports.hasInfoDiagnostic = hasInfoDiagnostic;
function hasHintDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === types_1.DiagnosticSeverity.Hint);
}
exports.hasHintDiagnostic = hasHintDiagnostic;
function setExtension(id, value, model) {
    id = id.startsWith('x-') ? id : `x-${id}`;
    const data = model.json();
    data[id] = value;
}
exports.setExtension = setExtension;
function mergePatch(origin, patch) {
    // If the patch is not an object, it replaces the origin.
    if (!isObject(patch)) {
        return patch;
    }
    const result = !isObject(origin)
        ? {} // Non objects are being replaced.
        : Object.assign({}, origin); // Make sure we never modify the origin.
    Object.keys(patch).forEach(key => {
        const patchVal = patch[key];
        if (patchVal === null) {
            delete result[key];
        }
        else {
            result[key] = mergePatch(result[key], patchVal);
        }
    });
    return result;
}
exports.mergePatch = mergePatch;
function isObject(value) {
    return Boolean(value) && typeof value === 'object' && Array.isArray(value) === false;
}
exports.isObject = isObject;
function hasRef(value) {
    return isObject(value) && '$ref' in value && typeof value.$ref === 'string';
}
exports.hasRef = hasRef;
function tilde(str) {
    return str.replace(/[~/]{1}/g, (sub) => {
        switch (sub) {
            case '/': return '~1';
            case '~': return '~0';
        }
        return sub;
    });
}
exports.tilde = tilde;
function untilde(str) {
    if (!str.includes('~'))
        return str;
    return str.replace(/~[01]/g, (sub) => {
        switch (sub) {
            case '~1': return '/';
            case '~0': return '~';
        }
        return sub;
    });
}
exports.untilde = untilde;
function retrievePossibleRef(data, pathOfData, spec = {}) {
    if (!hasRef(data)) {
        return data;
    }
    const refPath = serializePath(data.$ref);
    if (pathOfData.startsWith(refPath)) { // starts by given path
        return retrieveDeepData(spec, splitPath(refPath)) || data;
    }
    else if (pathOfData.includes(refPath)) { // circular path in substring of path
        const substringPath = pathOfData.split(refPath)[0];
        return retrieveDeepData(spec, splitPath(`${substringPath}${refPath}`)) || data;
    }
    return data;
}
exports.retrievePossibleRef = retrievePossibleRef;
function retrieveDeepData(value, path) {
    let index = 0;
    const length = path.length;
    while (typeof value === 'object' && value && index < length) {
        value = value[path[index++]];
    }
    return index === length ? value : undefined;
}
function serializePath(path) {
    if (path.startsWith('#'))
        return path.substring(1);
    return path;
}
function splitPath(path) {
    return path.split('/').filter(Boolean).map(untilde);
}
