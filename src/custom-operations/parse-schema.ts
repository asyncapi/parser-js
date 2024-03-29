import { JSONPath } from 'jsonpath-plus';

import { xParserOriginalPayload } from '../constants';
import { parseSchema, getSchemaFormat, getDefaultSchemaFormat } from '../schema-parser';

import type { Parser } from '../parser';
import type { ParseSchemaInput } from '../schema-parser';
import type { DetailedAsyncAPI } from '../types';

interface ToParseItem {
  input: ParseSchemaInput;
  value: any;
}

const customSchemasPathsV2 = [
  // operations
  '$.channels.*.[publish,subscribe].message',
  '$.channels.*.[publish,subscribe].message.oneOf.*',
  '$.components.channels.*.[publish,subscribe].message',
  '$.components.channels.*.[publish,subscribe].message.oneOf.*',
  // messages
  '$.components.messages.*',
];

const customSchemasPathsV3 = [
  // channels
  '$.channels.*.messages.*.payload',
  '$.channels.*.messages.*.headers',
  '$.components.channels.*.messages.*.payload',
  '$.components.channels.*.messages.*.headers',
  // operations
  '$.operations.*.messages.*.payload',
  '$.operations.*.messages.*.headers',
  '$.components.operations.*.messages.*.payload',
  '$.components.operations.*.messages.*.headers',
  // messages
  '$.components.messages.*.payload',
  '$.components.messages.*.headers.*',
  // schemas 
  '$.components.schemas.*',
];

export async function parseSchemasV2(parser: Parser, detailed: DetailedAsyncAPI) {
  const defaultSchemaFormat = getDefaultSchemaFormat(detailed.semver.version);
  const parseItems: Array<ToParseItem> = [];

  const visited: Set<unknown> = new Set();
  customSchemasPathsV2.forEach(path => {
    JSONPath({
      path,
      json: detailed.parsed,
      resultType: 'all',
      callback(result) {
        const value = result.value;
        if (visited.has(value)) {
          return;
        }
        visited.add(value);

        const payload = value.payload;
        if (!payload) {
          return;
        }

        const schemaFormat = getSchemaFormat(value.schemaFormat, detailed.semver.version);
        parseItems.push({
          input: {
            asyncapi: detailed,
            data: payload,
            meta: {
              message: value,
            },
            path: [...splitPath(result.path), 'payload'],
            schemaFormat,
            defaultSchemaFormat,
          },
          value,
        });
      },
    });
  });

  return Promise.all(parseItems.map(item => parseSchemaV2(parser, item)));
}

export async function parseSchemasV3(parser: Parser, detailed: DetailedAsyncAPI) {
  const defaultSchemaFormat = getDefaultSchemaFormat(detailed.semver.version);
  const parseItems: Array<ToParseItem> = [];

  const visited: Set<unknown> = new Set();
  customSchemasPathsV3.forEach(path => {
    JSONPath({
      path,
      json: detailed.parsed,
      resultType: 'all',
      callback(result) {
        const value = result.value;
        if (visited.has(value)) {
          return;
        }
        visited.add(value);

        const schema = value.schema;
        if (!schema) {
          return;
        }

        let schemaFormat = value.schemaFormat;
        if (!schemaFormat) {
          return;
        }
        schemaFormat = getSchemaFormat(value.schemaFormat, detailed.semver.version);

        parseItems.push({
          input: {
            asyncapi: detailed,
            data: schema,
            meta: {
              message: value,
            },
            path: [...splitPath(result.path), 'schema'],
            schemaFormat,
            defaultSchemaFormat,
          },
          value,
        });
      },
    });
  });

  return Promise.all(parseItems.map(item => parseSchemaV3(parser, item)));
}

async function parseSchemaV3(parser: Parser, item: ToParseItem) {
  const originalData = item.input.data;
  const parsedData = await parseSchema(parser, item.input);
  if (item.value?.schema !== undefined) {
    item.value.schema = parsedData;
  } else {
    item.value = parsedData;
  }
  // save original payload only when data is different (returned by custom parsers)
  if (originalData !== parsedData) {
    item.value[xParserOriginalPayload] = originalData;
  }
}

async function parseSchemaV2(parser: Parser, item: ToParseItem) {
  const originalData = item.input.data;
  const parsedData = item.value.payload = await parseSchema(parser, item.input);
  // save original payload only when data is different (returned by custom parsers)
  if (originalData !== parsedData) {
    item.value[xParserOriginalPayload] = originalData;
  }
}

function splitPath(path: string): string[] {
  // remove $[' from beginning and '] at the end and split by ']['
  return path.slice(3).slice(0, -2).split('\'][\'');
}
