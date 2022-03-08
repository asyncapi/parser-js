var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { applyTraitsV2 } from './apply-traits';
import { checkCircularRefs } from './check-circular-refs';
import { parseSchemasV2 } from './parse-schema';
import { anonymousNaming } from './anonymous-naming';
export function customOperations(parser, document, detailed, options) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (detailed.semver.major) {
            case 2: return operationsV2(parser, document, detailed, options);
            // case 3: return operationsV3(parser, document, detailed, options);
        }
    });
}
function operationsV2(parser, document, detailed, options) {
    return __awaiter(this, void 0, void 0, function* () {
        checkCircularRefs(document);
        anonymousNaming(document);
        if (options.applyTraits) {
            applyTraitsV2(detailed.parsed);
        }
        if (options.parseSchemas) {
            yield parseSchemasV2(parser, detailed);
        }
    });
}
