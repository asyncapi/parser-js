import { JSONPath } from 'jsonpath-plus';
import { toPath } from 'lodash';

import { parseSchema, getSchemaFormat, getDefaultSchemaFormat } from '../schema-parser';
import { xParserOriginalPayload } from '../constants';

import type { Parser } from '../parser';
import type { ParseSchemaInput } from "../schema-parser";
import type { DetailedAsyncAPI } from "../types";

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
            path: [...toPath(result.path.slice(1)), 'payload'],
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

async function parseSchemaV2(parser: Parser, item: ToParseItem) {
  item.value[xParserOriginalPayload] = item.input.data;
  item.value.payload = await parseSchema(parser, item.input);
}
