var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createRulesetFunction } from '@stoplight/spectral-core';
import { aas2_0, aas2_1, aas2_2, aas2_3, aas2_4 } from '@stoplight/spectral-formats';
import { validateSchema, getSchemaFormat, getDefaultSchemaFormat } from './index';
import { createDetailedAsyncAPI } from '../utils';
export function asyncApi2SchemaParserRule(parser) {
    return {
        description: 'Custom schema must be correctly formatted from the point of view of the used format.',
        formats: [aas2_0, aas2_1, aas2_2, aas2_3, aas2_4],
        message: '{{error}}',
        severity: 'error',
        type: 'validation',
        recommended: true,
        given: [
            // operations
            '$.channels.*.[publish,subscribe].message',
            '$.channels.*.[publish,subscribe].message.oneOf.*',
            '$.components.channels.*.[publish,subscribe].message',
            '$.components.channels.*.[publish,subscribe].message.oneOf.*',
            // messages
            '$.components.messages.*',
        ],
        then: {
            function: rulesetFunction(parser),
        },
    };
}
function rulesetFunction(parser) {
    return createRulesetFunction({
        input: {
            type: 'object',
            properties: {
                schemaFormat: {
                    type: 'string',
                },
                payload: true, // any value
            }
        },
        options: null
    }, (targetVal = {}, _, ctx) => __awaiter(this, void 0, void 0, function* () {
        if (!targetVal.payload) {
            return [];
        }
        const path = [...ctx.path, 'payload'];
        const spec = ctx.document.data;
        const schemaFormat = getSchemaFormat(targetVal.schemaFormat, spec.asyncapi);
        const defaultSchemaFormat = getDefaultSchemaFormat(spec.asyncapi);
        const asyncapi = createDetailedAsyncAPI(ctx.document.data, spec);
        const input = {
            asyncapi,
            data: targetVal.payload,
            meta: {},
            path,
            schemaFormat,
            defaultSchemaFormat,
        };
        try {
            return yield validateSchema(parser, input);
        }
        catch (err) {
            return [
                {
                    message: `Error thrown during schema validation, name: ${err.name}, message: ${err.message}, stack: ${err.stack}`,
                    path,
                }
            ];
        }
    }));
}
