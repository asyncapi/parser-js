import { RuleDefinition, createRulesetFunction } from '@stoplight/spectral-core';

import type { JsonPath } from '@stoplight/types';
import type { IFunctionResult } from '@stoplight/spectral-core';
import type { v2 } from 'spec-types';
import type { Parser } from 'parser';
import type { DetailedAsyncAPI } from 'types';
import { ParseSchemaInput, getDefaultSchemaFormat, getSchemaFormat, parseSchema } from '../../../schema-parser';
import { createDetailedAsyncAPI } from '../../../utils';
import { getMessageExamples, validate } from './messageExamples';

export function asyncApi2MessageExamplesParserRule(parser: Parser): RuleDefinition {
  return {
    description: 'Examples of message object should validate against a payload with an explicit schemaFormat.',
    message: '{{error}}',
    severity: 'error',
    recommended: true,
    given: [
      // messages
      '$.channels.*.[publish,subscribe][?(@property === \'message\' && @.schemaFormat !== void 0)]',
      '$.channels.*.[publish,subscribe].message.oneOf[?(!@null && @.schemaFormat !== void 0)]',
      '$.components.channels.*.[publish,subscribe].message[?(@property === \'message\' && @.schemaFormat !== void 0)]',
      '$.components.channels.*.[publish,subscribe].message.oneOf[?(!@null && @.schemaFormat !== void 0)]',
      '$.components.messages[?(!@null && @.schemaFormat !== void 0)]',
      // message traits
      '$.channels.*.[publish,subscribe].message.traits[?(!@null && @.schemaFormat !== void 0)]',
      '$.channels.*.[publish,subscribe].message.oneOf.*.traits[?(!@null && @.schemaFormat !== void 0)]',
      '$.components.channels.*.[publish,subscribe].message.traits[?(!@null && @.schemaFormat !== void 0)]',
      '$.components.channels.*.[publish,subscribe].message.oneOf.*.traits[?(!@null && @.schemaFormat !== void 0)]',
      '$.components.messages.*.traits[?(!@null && @.schemaFormat !== void 0)]',
      '$.components.messageTraits[?(!@null && @.schemaFormat !== void 0)]',
    ],
    then: {
      function: rulesetFunction(parser),
    },
  };
}

function rulesetFunction(parser: Parser) {
  return createRulesetFunction<v2.MessageObject, null>(
    {
      input: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          summary: {
            type: 'string',
          },
        },
      },
      options: null,
    },
    async (targetVal, _, ctx) => {
      if (!targetVal.examples) return;
      if (!targetVal.payload) return;

      const document = ctx.document;
      const parsedSpec = document.data as v2.AsyncAPIObject;
      const schemaFormat = getSchemaFormat(targetVal.schemaFormat, parsedSpec.asyncapi);
      const defaultSchemaFormat = getDefaultSchemaFormat(parsedSpec.asyncapi);
      const asyncapi = createDetailedAsyncAPI(parsedSpec, (document as any).__parserInput, document.source || undefined);
      const input: ParseExampleSchemaInput = {
        asyncapi,
        rootPath: ctx.path,
        schemaFormat,
        defaultSchemaFormat
      };

      const results: IFunctionResult[] = [];
      const payloadSchemaResults = await parseExampleSchema(parser, targetVal.payload, input);
      const payloadSchema = payloadSchemaResults.schema;
      results.push(...payloadSchemaResults.errors);

      for (const example of getMessageExamples(targetVal)) {
        const { path, value } = example;
        // validate payload
        if (value.payload !== undefined && payloadSchema !== undefined) {
          const errors = validate(value.payload, path, 'payload', payloadSchema, ctx);
          if (Array.isArray(errors)) {
            results.push(...errors);
          }
        }
      }
      return results;
    }
  );
}

interface ParseExampleSchemaInput {
  asyncapi: DetailedAsyncAPI;
  rootPath: JsonPath;
  schemaFormat: string;
  defaultSchemaFormat: string;
}

interface ParseExampleSchemaResult {
  path: Array<string | number>;
  schema: v2.AsyncAPISchemaObject | undefined;
  errors: IFunctionResult[]
}

async function parseExampleSchema(parser: Parser, schema: unknown, input: ParseExampleSchemaInput): Promise<ParseExampleSchemaResult> {
  const path = [...input.rootPath, 'payload'];
  if (schema === undefined) {
    return {path, schema: undefined, errors: []};
  }
  try {
    const parseSchemaInput: ParseSchemaInput = {
      asyncapi: input.asyncapi,
      data: schema,
      meta: {},
      path,
      schemaFormat: input.schemaFormat,
      defaultSchemaFormat: input.defaultSchemaFormat,
    }; 
    const parsedSchema = await parseSchema(parser, parseSchemaInput);
    return {path, schema: parsedSchema, errors: []};
  } catch (err: any) {
    const error: IFunctionResult = {
      message: `Error thrown during schema validation. Name: ${err.name}, message: ${err.message}, stack: ${err.stack}`,
      path
    };
    return {path, schema: undefined, errors: [error]};
  }
}
