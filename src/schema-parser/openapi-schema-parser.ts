import { SchemaParser, ParseSchemaInput, ValidateSchemaInput } from "../schema-parser";
import type { AsyncAPISchema, SchemaValidateResult } from '../types';
import {Spectral, Document, type RuleDefinition, type RulesetDefinition } from "@stoplight/spectral-core";
import { Json } from "@stoplight/spectral-parsers";
import { oas as oasRuleset } from "@stoplight/spectral-rulesets";
const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema');

export function OpenAPISchemaParser(): SchemaParser {
  return {
    validate,
    parse,
    getMimeTypes,
  }
}

const spectral = new(Spectral)
let rule = {...oasRuleset};
// Unnecessary rules
[
    'oas3-unused-component',
    'info-contact',
    'info-description',
    'info-license',
    'oas3-api-servers',

].forEach(function(name) {
    delete (rule.rules as Record<string, Readonly<RuleDefinition>>)[name];
});
spectral.setRuleset(rule as RulesetDefinition);

async function validate(input: ValidateSchemaInput<unknown, unknown>): Promise<SchemaValidateResult[]> {
    const oas = {"openapi":"3.0.0","info":{"title":"a","description":"a","version":"1"},"paths":{},"components":{"schemas":{"schema":input.data}}};
    let result: SchemaValidateResult[] = []
    try {
        const document = new Document(JSON.stringify(oas), Json);
        let { results } = await spectral.runWithResolved(document);
        results.forEach(r => {
            result.push({
                message: r.message,
                path: input.path.concat(r.path.filter(p => !["components", "schemas", "schema"].includes(p.toString()))),
            });
        });
    } catch(err) {
      console.error(err);
    } 

    return result;
}

async function parse(input: ParseSchemaInput<unknown, unknown>): Promise<AsyncAPISchema> {
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

    const message = (input.meta as any).message
    if (message !== undefined) {
      message['x-parser-original-schema-format'] = input.schemaFormat || input.defaultSchemaFormat;
      message['x-parser-original-payload'] = message.payload;
      message.payload = transformed;
      delete message.schemaFormat;
    };

    return transformed;
}

function getMimeTypes() {
  return [
    'application/vnd.oai.openapi;version=3.0.0',
    'application/vnd.oai.openapi+json;version=3.0.0',
    'application/vnd.oai.openapi+yaml;version=3.0.0',
  ];
}

function iterateSchema(schema: any) {
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

function aliasProps(obj: any) {
  for (const key in obj) {
    const prop = obj[key];

    if (prop.xml !== undefined) {
      prop['x-xml'] = prop.xml;
      delete prop.xml;
    }

    iterateSchema(obj[key]);
  }
}
