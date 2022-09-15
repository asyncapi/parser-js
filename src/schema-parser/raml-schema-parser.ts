import yaml from 'js-yaml';
import * as lib from 'webapi-parser';

/* eslint-disable */
const wap = lib.WebApiParser;
const r2j = require('ramldt2jsonschema');
/* eslint-enable */

import type { SchemaParser, ParseSchemaInput, ValidateSchemaInput } from '../schema-parser';
import type { AsyncAPISchema, SchemaValidateResult } from '../types';

export function RamlSchemaParser(): SchemaParser {
  return {
    validate,
    parse,
    getMimeTypes,
  };
}

async function parse(input: ParseSchemaInput<unknown, unknown>): Promise<AsyncAPISchema> {
  const payload = formatPayload(input.data);

  // Draft 6 is compatible with 7.
  const jsonModel = await r2j.dt2js(payload, 'tmpType', { draft: '06' });
  return jsonModel.definitions.tmpType;
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
  
  const validateResult: SchemaValidateResult[] = [];
  report.results.forEach(result => {
    validateResult.push({
      message: result.message,
      path: input.path, // RAML parser doesn't provide a path to the error.
    });
  });

  return validateResult;
}

function formatPayload(payload: unknown): string {
  if (typeof payload === 'object') {
    return `#%RAML 1.0 Library\n${yaml.dump({ types: { tmpType: payload } })}`;
  }
  return payload as string;
}