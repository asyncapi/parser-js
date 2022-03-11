import { JSONPath } from 'jsonpath-plus';
import { toPath } from 'lodash';

import { parseSchema, getDefaultSchemaFormat } from '../schema-parser';
import { xParserOriginalSchemaFormat } from '../constants';

import type { ParseSchemaInput } from "../schema-parser";
import type { DetailedAsyncAPI } from "../types";

interface ToParseItem {
  input: ParseSchemaInput;
  value: any;
}

const customSchemasPathsV2 = [
  '$.channels.*.[publish,subscribe].message',
  '$.channels.*.[publish,subscribe].message.oneOf.*',
  '$.components.channels.*.[publish,subscribe].message',
  '$.components.channels.*.[publish,subscribe].message.oneOf.*',
  '$.components.messages.*',
];

export async function parseSchemasV2(detailed: DetailedAsyncAPI) {
  const defaultSchemaFormat = getDefaultSchemaFormat(detailed.parsed.asyncapi as string);
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

        parseItems.push({
          input: {
            asyncapi: detailed,
            data: payload,
            meta: undefined,
            path: [...toPath(result.path.slice(1)), 'payload'],
            schemaFormat: value.schemaFormat || defaultSchemaFormat,
            defaultSchemaFormat,
          },
          value,
        });
      },
    });
  });

  return Promise.all(parseItems.map(parseSchemaV2));
}

async function parseSchemaV2(item: ToParseItem) {
  item.value[xParserOriginalSchemaFormat] = item.input.schemaFormat;
  item.value.payload = await parseSchema(item.input);
}
