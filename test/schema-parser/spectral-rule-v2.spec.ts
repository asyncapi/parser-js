import { Parser } from '../../src/parser';
import { validate } from '../../src/lint';
import { AsyncAPISchemaParser } from '../../src/schema-parser/asyncapi-schema-parser';

describe('aas2schemaParserRule', function() {
  const parser = new Parser();
  parser.registerSchemaParser(AsyncAPISchemaParser());

  it('should validate invalid AsyncAPI Schema with invalid schema', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel1: {
          publish: {
            message: {
              payload: {
                oneOf: "this should be an array",
                properties: {
                  name: {
                    if: "this should be an if"
                  }
                }
              }
            }
          }
        }
      }
    }
    const { diagnostics } = await validate(parser, document);
    
    // expect(parsed).toBeInstanceOf(AsyncAPIDocumentV2);
    // expect(diagnostics.length > 0).toEqual(true);
    // console.log(diagnostics);
  });
});
