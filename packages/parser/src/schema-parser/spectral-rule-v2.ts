import { createRulesetFunction } from '@stoplight/spectral-core';

import { validateSchema, getSchemaFormat, getDefaultSchemaFormat } from './index';
import { createDetailedAsyncAPI } from '../utils';

import type { RuleDefinition } from '@stoplight/spectral-core';
import type { Parser } from '../parser';
import type { ValidateSchemaInput } from './index';
import type { SchemaValidateResult } from '../types';
import type { v2 } from '../spec-types';

export function asyncApi2SchemaParserRule(parser: Parser): RuleDefinition {
  return {
    description: 'Custom schema must be correctly formatted from the point of view of the used format.',
    message: '{{error}}',
    severity: 'error',
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

function rulesetFunction(parser: Parser) {
  return createRulesetFunction<{ schemaFormat?: string, payload?: any }, null>(
    {
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
    },
    async (targetVal = {}, _, ctx) => {
      if (!targetVal.payload) {
        return [];
      }

      const path = [...ctx.path, 'payload'];
      const document = ctx.document;
      const parsedSpec = document.data as v2.AsyncAPIObject;
      const schemaFormat = getSchemaFormat(targetVal.schemaFormat, parsedSpec.asyncapi);
      const defaultSchemaFormat = getDefaultSchemaFormat(parsedSpec.asyncapi);
      const asyncapi = createDetailedAsyncAPI(parsedSpec, (document as any).__parserInput, document.source || undefined);

      const input: ValidateSchemaInput = {
        asyncapi,
        data: targetVal.payload,
        meta: {},
        path,
        schemaFormat,
        defaultSchemaFormat,
      }; 

      try {
        return await validateSchema(parser, input);
      } catch (err: any) {
        return [
          {
            message: `Error thrown during schema validation. Name: ${err.name}, message: ${err.message}, stack: ${err.stack}`,
            path,
          }
        ] as SchemaValidateResult[];
      }
    }
  );
}
