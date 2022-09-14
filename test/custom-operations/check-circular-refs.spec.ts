import { Parser } from '../../src/parser';
import { xParserCircular } from '../../src/constants';

describe('custom operations - check circular references', function() {
  const parser = new Parser();

  it('should not assign x-parser-circular extension when document has not circular schemas', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation',
            message: {
              payload: {
                property1: {
                  $ref: '#/channels/channel/publish/message/payload/property2'
                },
                property2: {
                  type: 'string',
                }
              },
            }
          }
        }
      }
    });

    expect(document?.extensions().get(xParserCircular)?.value()).toEqual(undefined);
  });

  it('should assign x-parser-circular extension when document has circular schemas', async function() {
    const { document } = await parser.parse({
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'operation',
            message: {
              payload: {
                property: {
                  $ref: '#/channels/channel/publish/message/payload'
                },
              },
            }
          }
        }
      }
    });

    expect(document?.extensions().get(xParserCircular)?.value()).toEqual(true);
  });
});
