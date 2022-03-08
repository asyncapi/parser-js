var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Document } from '@stoplight/spectral-core';
import { Yaml } from '@stoplight/spectral-parsers';
import { normalizeInput, mergePatch, hasErrorDiagnostic, hasWarningDiagnostic, hasInfoDiagnostic, hasHintDiagnostic } from './utils';
const defaultOptions = {
    allowedSeverity: {
        warning: true,
        info: true,
        hint: true,
    }
};
export function validate(spectral, asyncapi, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { allowedSeverity } = mergePatch(defaultOptions, options);
        const stringifiedDocument = normalizeInput(asyncapi);
        const document = new Document(stringifiedDocument, Yaml, options.source);
        // eslint-disable-next-line prefer-const
        let { resolved: validated, results } = yield spectral.runWithResolved(document);
        if (hasErrorDiagnostic(results) ||
            (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.warning) && hasWarningDiagnostic(results)) ||
            (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.info) && hasInfoDiagnostic(results)) ||
            (!(allowedSeverity === null || allowedSeverity === void 0 ? void 0 : allowedSeverity.hint) && hasHintDiagnostic(results))) {
            validated = undefined;
        }
        return { validated, diagnostics: results };
    });
}
