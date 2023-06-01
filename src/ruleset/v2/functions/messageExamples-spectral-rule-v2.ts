import { RuleDefinition, createRulesetFunction } from '@stoplight/spectral-core';
import { schema as schemaFn } from '@stoplight/spectral-functions';

import type { JsonPath } from '@stoplight/types';
import type { IFunctionResult, RulesetFunctionContext } from '@stoplight/spectral-core';
import type { JSONSchema7 } from 'json-schema';
import type { v2 } from 'spec-types';
import type { Parser } from 'parser';
import type { DetailedAsyncAPI } from 'types';
import { ParseSchemaInput, getDefaultSchemaFormat, getSchemaFormat, parseSchema } from '../../../schema-parser';
import { createDetailedAsyncAPI } from '../../../utils';

export function asyncApi2MessageExamplesParserRule(parser: Parser): RuleDefinition {
  return {
    description: 'Examples of message object should validate againt the "payload" and "headers" schemas.',
    message: '{{error}}',
    severity: 'error',
    recommended: true,
    given: [
      // messages
      '$.channels.*.[publish,subscribe].message',
      '$.channels.*.[publish,subscribe].message.oneOf.*',
      '$.components.channels.*.[publish,subscribe].message',
      '$.components.channels.*.[publish,subscribe].message.oneOf.*',
      '$.components.messages.*',
      // message traits
      '$.channels.*.[publish,subscribe].message.traits.*',
      '$.channels.*.[publish,subscribe].message.oneOf.*.traits.*',
      '$.components.channels.*.[publish,subscribe].message.traits.*',
      '$.components.channels.*.[publish,subscribe].message.oneOf.*.traits.*',
      '$.components.messages.*.traits.*',
      '$.components.messageTraits.*',
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
      const payloadSchemaResults = await parseExampleSchema(parser, targetVal.payload, 'payload', input);
      const payloadSchema = payloadSchemaResults.schema;
      results.push(...payloadSchemaResults.errors);

      const headersSchemaResults = await parseExampleSchema(parser, targetVal.headers, 'headers', input);
      const headersSchema = headersSchemaResults.schema;
      results.push(...headersSchemaResults.errors);

      for (const example of getMessageExamples(targetVal)) {
        const { path, value } = example;
        // validate payload
        if (value.payload !== undefined && payloadSchema !== undefined) {
          const errors = validate(value.payload, path, 'payload', payloadSchema, ctx);
          if (Array.isArray(errors)) {
            results.push(...errors);
          }
        }
  
        // validate headers
        if (value.headers !== undefined && headersSchema !== undefined) {
          const errors = validate(value.headers, path, 'headers', headersSchema, ctx);
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

async function parseExampleSchema(parser: Parser, schema: unknown, type: 'payload' | 'headers', input: ParseExampleSchemaInput): Promise<ParseExampleSchemaResult> {
  const path = [...input.rootPath, type];
  if (schema === undefined) {
    return {path, schema: undefined, errors: []};
  }
  try {
    const parseSchemaInput: ParseSchemaInput = {
      asyncapi: input.asyncapi,
      data: serializeSchema(schema, type),
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

function serializeSchema(schema: unknown, type: 'payload' | 'headers'): any {
  if (!schema && typeof schema !== 'boolean') { // if schema is falsy then
    if (type === 'headers') { // object for headers
      schema = { type: 'object' };
    } else { // anything for payload
      schema = {};
    }
  } else if (typeof schema === 'boolean') { // spectral cannot handle boolean schemas
    if (schema === true) {
      schema = {}; // everything
    } else {
      schema = { not: {} }; // nothing
    }
  }
  return schema;
}

function getMessageExamples(message: v2.MessageObject): Array<{ path: JsonPath; value: v2.MessageExampleObject }> {
  if (!Array.isArray(message.examples)) {
    return [];
  }
  return (
    message.examples.map((example, index) => {
      return {
        path: ['examples', index],
        value: example,
      };
    }) ?? []
  );
}

function validate(
  value: unknown,
  path: JsonPath,
  type: 'payload' | 'headers',
  schema: unknown,
  ctx: RulesetFunctionContext,
): ReturnType<typeof schemaFn> {
  return schemaFn(
    value,
    {
      allErrors: true,
      schema: schema as JSONSchema7,
    },
    {
      ...ctx,
      path: [...ctx.path, ...path, type],
    },
  );
}
