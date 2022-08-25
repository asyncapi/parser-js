import { SchemaParser, ParseSchemaInput, ValidateSchemaInput } from "../schema-parser";
import type { AsyncAPISchema, SchemaValidateResult } from '../types';
import yaml from 'js-yaml';
import * as lib from "webapi-parser";
const wap = lib.WebApiParser;
const r2j = require('ramldt2jsonschema');

export function RamlSchemaParser(): SchemaParser {
    return {
      validate,
      parse,
      getMimeTypes,
    }
  }

async function parse(input: ParseSchemaInput<unknown, unknown>): Promise<AsyncAPISchema> {
    const message = (input.meta as any).message;
    const payload = formatPayload(input.data);

    // Draft 6 is compatible with 7.
    const jsonModel = await r2j.dt2js(payload, 'tmpType', { draft: '06' });
    const convertedType = jsonModel.definitions.tmpType;

    message['x-parser-original-schema-format'] = input.schemaFormat || input.defaultSchemaFormat;
    message['x-parser-original-payload'] = payload;
    message.payload = convertedType;
    delete message.schemaFormat;
  
    return message.payload;
}

function getMimeTypes() {
  return [
    'application/raml+yaml;version=1.0',
  ];
}

async function validate(input: ValidateSchemaInput<unknown, unknown>): Promise<SchemaValidateResult[]> {
  const payload = formatPayload(input.data);
  const parsed = await wap.raml10.parse(payload);
  const report = await wap.raml10.validate(parsed);
  if (report.conforms) {
    // No errors found.
    return [];
  }
  
  let validateResult: SchemaValidateResult[] = [];
  report.results.forEach(result => {
    validateResult.push({
      message: result.message,
      path: [], // RAML parser doesn't provide a path to the error.
    } as SchemaValidateResult);
  });

  return validateResult;
}

function formatPayload(payload: any): string {
  if (typeof payload === 'object') {
      payload = `#%RAML 1.0 Library\n${ 
      yaml.dump({ types: { tmpType: payload } })}`;
  }

  return payload as string;
}