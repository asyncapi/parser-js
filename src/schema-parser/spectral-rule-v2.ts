import { createRulesetFunction } from '@stoplight/spectral-core';
import { aas2_0, aas2_1, aas2_2, aas2_3, aas2_4 } from '@stoplight/spectral-formats';

import { validateSchema, getSchemaFormat, getDefaultSchemaFormat } from './index';
import { createDetailedAsyncAPI } from '../utils';

import type { RuleDefinition } from "@stoplight/spectral-core";
import type { Parser } from '../parser';
import type { ValidateSchemaInput } from './index';
import { SchemaValidateResult } from 'types';

const aas2Formats = [aas2_0, aas2_1, aas2_2, aas2_3, aas2_4];

export const aas2schemaParserRuleName = 'asyncapi-custom-schema';
export function aas2schemaParserRule(parser: Parser): RuleDefinition {
  return {
    description: 'Custom schema must be correctly formatted from the point of view of the used format.',
    formats: aas2Formats,
    message: '{{error}}',
    severity: 'error',
    type: 'validation',
    recommended: true,
    given: [
      // operations
      '$.channels.*.[publish,subscribe].message',
      '$.components.channels.*.[publish,subscribe].message',
      // messages
      '$.components.messages.*',
    ],
    then: {
      function: rulesetFunction(parser),
    },
  }
}

function rulesetFunction(parser: Parser) {
  return createRulesetFunction<{ schematFormat?: string, payload?: any }, null>(
    {
      input: {
        type: 'object',
        properties: {
          schemaFormat: {
            type: 'string',
          },
          payload: true, // any
        }
      },
      options: null
    },
    async function asyncApi2CustomSchema(targetVal = {}, _, ctx) {
      if (!targetVal.payload) {
        return [];
      }

      const path = [...ctx.path, 'payload'];
      const spec = ctx.document.data as { asyncapi: string };
      const schemaFormat = getSchemaFormat(targetVal.schematFormat, spec.asyncapi);
      const defaultSchemaFormat = getDefaultSchemaFormat(spec.asyncapi);
      // we don't have a parsed specification yet because we are still executing code in the context of spectral
      const asyncapi = createDetailedAsyncAPI(spec, undefined as any);

      const input: ValidateSchemaInput = {
        asyncapi,
        data: targetVal.payload,
        meta: {},
        path,
        schemaFormat,
        defaultSchemaFormat,
      } 

      let result: SchemaValidateResult[] | void;
      try {
        result = await validateSchema(parser, input);
      } catch(err: any) {
        if (err instanceof Error) {
          if (err.message === 'Unknown schema format') {
            path.pop(); // remove 'payload' as last element of path
            path.push('schemaFormat');
            return [
              {
                message: `Unknown schema format: ${schemaFormat}`,
                path,
              }
            ] as SchemaValidateResult[];
          } else {
            return [
              {
                message: `Error thrown during schema validation: name: ${err.name}, message:, ${err.message}, stack: ${err.stack}`,
                path,
              }
            ] as SchemaValidateResult[];
          }
        }
      }

      return result && result.map(r => ({
        ...r,
        path: r.path ? [...path, ...r.path] : path,
      }));
    }
  )
}
