"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAPIDocument = void 0;
const base_1 = require("../base");
class AsyncAPIDocument extends base_1.BaseModel {
    version() {
        return this._json.asyncapi;
    }
}
exports.AsyncAPIDocument = AsyncAPIDocument;
