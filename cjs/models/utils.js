"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = void 0;
function createModel(Model, value, meta, parent) {
    return new Model(value, Object.assign(Object.assign({}, meta), { asyncapi: meta.asyncapi || (parent === null || parent === void 0 ? void 0 : parent.meta().asyncapi) }));
}
exports.createModel = createModel;
