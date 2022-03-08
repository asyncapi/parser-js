var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Ajv from 'ajv';
import { schemaV3 } from './openapi/schema_v3';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema');
const ajv = new Ajv({
    allErrors: true,
    strict: false,
    logger: false,
});
ajv.addSchema(schemaV3, 'openapi');
export function OpenAPISchemaParser() {
    return {
        validate,
        parse,
        getMimeTypes,
    };
}
function validate(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const validator = ajv.getSchema('openapi');
        let result = [];
        const valid = validator(input.data);
        if (!valid && validator.errors) {
            result = ajvToSpectralResult(input.path, [...validator.errors]);
        }
        return result;
    });
}
function parse(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const transformed = toJsonSchema(input.data, {
            cloneSchema: true,
            keepNotSupported: [
                'discriminator',
                'readOnly',
                'writeOnly',
                'deprecated',
                'xml',
                'example',
            ],
        });
        iterateSchema(transformed);
        return transformed;
    });
}
function getMimeTypes() {
    return [
        'application/vnd.oai.openapi;version=3.0.0',
        'application/vnd.oai.openapi+json;version=3.0.0',
        'application/vnd.oai.openapi+yaml;version=3.0.0',
    ];
}
function ajvToSpectralResult(path, errors) {
    return errors.map(error => {
        return {
            message: error.message,
            path: [...path, ...error.instancePath.replace(/^\//, '').split('/')],
        };
    });
}
function iterateSchema(schema) {
    if (schema.example !== undefined) {
        const examples = schema.examples || [];
        examples.push(schema.example);
        schema.examples = examples;
        delete schema.example;
    }
    if (schema.$schema !== undefined) {
        delete schema.$schema;
    }
    aliasProps(schema.properties);
    aliasProps(schema.patternProperties);
    aliasProps(schema.additionalProperties);
    aliasProps(schema.items);
    aliasProps(schema.additionalItems);
    aliasProps(schema.oneOf);
    aliasProps(schema.anyOf);
    aliasProps(schema.allOf);
    aliasProps(schema.not);
}
function aliasProps(obj) {
    for (const key in obj) {
        const prop = obj[key];
        if (prop.xml !== undefined) {
            prop['x-xml'] = prop.xml;
            delete prop.xml;
        }
        iterateSchema(obj[key]);
    }
}
