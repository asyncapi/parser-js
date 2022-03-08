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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToOldAPI = exports.OldAsyncAPIDocument = exports.fromFile = exports.fromURL = exports.unstringify = exports.stringify = exports.Parser = void 0;
const parser_1 = require("./parser");
Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return parser_1.Parser; } });
__exportStar(require("./models"), exports);
var stringify_1 = require("./stringify");
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return stringify_1.stringify; } });
Object.defineProperty(exports, "unstringify", { enumerable: true, get: function () { return stringify_1.unstringify; } });
var from_1 = require("./from");
Object.defineProperty(exports, "fromURL", { enumerable: true, get: function () { return from_1.fromURL; } });
Object.defineProperty(exports, "fromFile", { enumerable: true, get: function () { return from_1.fromFile; } });
var asyncapi_1 = require("./old-api/asyncapi");
Object.defineProperty(exports, "OldAsyncAPIDocument", { enumerable: true, get: function () { return asyncapi_1.AsyncAPIDocument; } });
var converter_1 = require("./old-api/converter");
Object.defineProperty(exports, "convertToOldAPI", { enumerable: true, get: function () { return converter_1.convertToOldAPI; } });
exports.default = parser_1.Parser;
