"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_parsers_1 = require("@stoplight/spectral-parsers");
const utils_1 = require("./utils");
const defaultOptions = {
    allowedSeverity: {
        warning: true,
        info: true,
        hint: true,
    }
};
function validate(spectral, asyncapi, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { allowedSeverity } = (0, utils_1.mergePatch)(defaultOptions, options);
        const stringifiedDocument = (0, utils_1.normalizeInput)(asyncapi);
        const document = new spectral_core_1.Document(stringifiedDocument, spectral_parsers_1.Yaml, options.source);
        // eslint-disable-next-line prefer-const
        let { resolved: validated, results } = yield spectral.runWithResolved(document);
        if ((0, utils_1.hasErrorDiagnostic)(results) ||
            (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.warning) && (0, utils_1.hasWarningDiagnostic)(results)) ||
            (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.info) && (0, utils_1.hasInfoDiagnostic)(results)) ||
            (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.hint) && (0, utils_1.hasHintDiagnostic)(results))) {
            validated = undefined;
        }
        return { validated, diagnostics: results };
    });
}
exports.validate = validate;
