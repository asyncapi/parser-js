import { Parser as ParserV2 } from 'parserv2';
import { Parser as ParserV3 } from 'parserv3';

import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';
import { OpenAPISchemaParser } from '@asyncapi/openapi-schema-parser';
import { RamlDTSchemaParser } from '@asyncapi/raml-dt-schema-parser';
import { ProtoBuffSchemaParser } from '@asyncapi/protobuf-schema-parser';

import type { ParserOptions as ParserOptionsParserV2 } from 'parserv2/esm/parser';
import type { ParserOptions as ParserOptionsParserV3 } from 'parserv3/esm/parser';

import { majorParserAPIVersion } from './utils';

export type ParserOptions = ParserOptionsParserV2 | ParserOptionsParserV3;
export type Options = {
  includeSchemaParsers?: boolean;
  parserOptions?: ParserOptions;
}

type Parser = ParserV2 | ParserV3;

export function NewParser(parserAPIVersion: string, options?: Options): Parser {
  const parserOptions: ParserOptions = options?.parserOptions || {};

  // This is done globally instead of per version because latest versions of those schema parsers are still compatible with newer versions of the Parser-JS.
  // If a breaking change is introduced in the future, then we would need to register the schema parsers compatible with each version of the Parser-JS.
  if (options?.includeSchemaParsers) {
    const defaultSchemaParsers = [
      AvroSchemaParser(),
      OpenAPISchemaParser(),
      RamlDTSchemaParser(),
      ProtoBuffSchemaParser(),
    ];

    if (!parserOptions.schemaParsers) {
      parserOptions.schemaParsers = defaultSchemaParsers;
    } else {
      // If the user provides a schema parser, use that one instead of the default one. Comparison is done with the mime types.
      const givenSchemaParsersMimeTypes = parserOptions.schemaParsers.map((schemaParser) => schemaParser.getMimeTypes()).flat();   
      const filteredDefaultSchemas = defaultSchemaParsers.filter((defaultSchemaParser) => !givenSchemaParsersMimeTypes.includes(defaultSchemaParser.getMimeTypes()[0]));
      parserOptions.schemaParsers.push(...filteredDefaultSchemas as any);
    }
  }

  const parserAPIMajorVersion = majorParserAPIVersion(parserAPIVersion); 
  switch (parserAPIMajorVersion) {
  case 1:
    return new ParserV2(parserOptions as ParserOptionsParserV2);
  default:
  case 0: // Using Parser v3 (latest atm) by default 
  case 2:
    return new ParserV3(parserOptions as ParserOptionsParserV3);
  }   
}