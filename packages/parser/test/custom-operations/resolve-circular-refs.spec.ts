import { Parser } from '../../src/parser';
import { xParserCircular } from '../../src/constants';
import { resolveCircularRefs } from '../../src/custom-operations/resolve-circular-refs';

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
                properties: {
                  property1: {
                    $ref: '#/channels/channel/publish/message/payload/property2'
                  },
                  property2: {
                    type: 'string',
                  }
                }
              },
            }
          }
        }
      }
    });

    expect(document?.extensions().get(xParserCircular)?.value()).toEqual(undefined);
  });

  it('should traverse a shared acyclic object only once', function() {
    let leafVisits = 0;
    const leaf = {};
    Object.defineProperty(leaf, 'value', {
      enumerable: true,
      get() {
        leafVisits += 1;
        return 'value';
      },
    });

    let graph: Record<string, any> = leaf;
    for (let level = 0; level < 12; level += 1) {
      graph = { left: graph, right: graph };
    }

    const document = { json: () => graph } as any;
    resolveCircularRefs(document, {} as any);

    expect(leafVisits).toEqual(1);
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
                properties: {
                  property: {
                    $ref: '#/channels/channel/publish/message/payload'
                  }
                },
              },
            }
          }
        }
      }
    });

    const documentData = document?.json() as any;
    expect(document?.extensions().get(xParserCircular)?.value()).toEqual(true);
    expect(documentData.channels.channel.publish.message.payload.properties.property).not.toBeUndefined();
    expect(documentData.channels.channel.publish.message.payload.properties.property === documentData.channels.channel.publish.message.payload).toEqual(true);
  });

  it('should assign x-parser-circular extension when document has circular schemas on external files', async function() {
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
                $ref: '../mocks/parse/circular-ref.yaml'
              },
            }
          }
        }
      }
    }, { source: __filename });

    const documentData = document?.json() as any;
    expect(document?.extensions().get(xParserCircular)?.value()).toEqual(true);
    expect(documentData.channels.channel.publish.message.payload.properties.deepProperty.properties.circular).not.toBeUndefined();
    expect(documentData.channels.channel.publish.message.payload.properties.deepProperty.properties.circular === documentData.channels.channel.publish.message.payload.properties.deepProperty).toEqual(true);
  });

  it('should assign x-parser-circular extension when document has circular schemas on external files (deep case)', async function() {
    const { document, diagnostics } = await parser.parse({
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
                $ref: '../mocks/parse/circular-ref-deep.yaml'
              },
            }
          }
        }
      }
    }, { source: __filename });

    const documentData = document?.json() as any;
    expect(document?.extensions().get(xParserCircular)?.value()).toEqual(true);
    expect(documentData.channels.channel.publish.message.payload.properties.ExternalFile.properties.testExt).not.toBeUndefined();
    expect(documentData.channels.channel.publish.message.payload.properties.ExternalFile.properties.testExt === documentData.channels.channel.publish.message.payload.properties.YetAnother).toEqual(true);
    expect(documentData.channels.channel.publish.message.payload.properties.YetAnother.properties.children.items).not.toBeUndefined();
    expect(documentData.channels.channel.publish.message.payload.properties.YetAnother.properties.children.items === documentData.channels.channel.publish.message.payload.properties.ExternalFile).toEqual(true);
  });
});
