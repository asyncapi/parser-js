import { migrateToOldAPI } from '../../src/old-api/migrator';
import { AsyncAPIDocument as OldAsyncAPIDocument } from '../../src/old-api/asyncapi';
import { AsyncAPIDocumentV2 } from '../../src';
import { anonymousNaming } from '../../src/custom-operations/anonymous-naming';
import { checkCircularRefs } from '../../src/custom-operations/check-circular-refs';
import { getDefaultSchemaFormat } from '../../src/schema-parser';
import { xParserCircular, xParserOriginalTraits, xParserOriginalSchemaFormat, xParserMessageParsed, xParserOriginalPayload } from '../../src/constants';

describe('migrateToOldAPI()', function() {
  it('should return AsyncAPIDocument instance', function() {
    const newApi = new AsyncAPIDocumentV2({} as any);
    expect(migrateToOldAPI(newApi)).toBeInstanceOf(OldAsyncAPIDocument);
  });

  it('should not assign x-parser-circular extension when document has not circular schemas', function() {
    const newApi = new AsyncAPIDocumentV2({
      channels: {
        channel: {
          publish: {
            message: {
              payload: {},
            }
          }
        }
      }
    } as any);

    checkCircularRefs(newApi);
    expect(migrateToOldAPI(newApi).ext(xParserCircular)).toEqual(undefined);
  });

  it('should assign x-parser-circular extension when document has circular schemas', function() {
    const newApi = new AsyncAPIDocumentV2({
      channels: {
        channel: {
          publish: {
            message: {
              payload: {
                properties: {
                  property: {
                    $ref: '#/components/channels/channel/publish/message/payload',
                  }
                }
              }
            }
          }
        }
      }
    } as any);

    checkCircularRefs(newApi);
    expect(migrateToOldAPI(newApi).ext(xParserCircular)).toEqual(true);
  });

  it('should assign x-parser-original-schema-format to the message object to the default one when field isn not defined', function() {
    const newApi = new AsyncAPIDocumentV2({
      asyncapi: '2.0.0',
      channels: {
        channel: {
          publish: {
            message: {
              payload: {},
              traits: [
                {},
                {},
              ]
            }
          },
          subscribe: {
            message: {
              payload: {},
              traits: [
                {},
                {},
              ]
            }
          }
        }
      }
    } as any);

    // apply anonymous naming
    anonymousNaming(newApi);
    const oldApi = migrateToOldAPI(newApi);
    expect(oldApi.json().channels.channel?.publish?.message?.[xParserOriginalSchemaFormat]).toEqual(getDefaultSchemaFormat('2.0.0'));
    expect((oldApi.json().channels.channel?.publish?.message as any)?.schemaFormat).toEqual(getDefaultSchemaFormat('2.0.0'));
    expect(oldApi.json().channels.channel?.subscribe?.message?.[xParserOriginalSchemaFormat]).toEqual(getDefaultSchemaFormat('2.0.0'));
    expect((oldApi.json().channels.channel?.subscribe?.message as any)?.schemaFormat).toEqual(getDefaultSchemaFormat('2.0.0'));
  });

  it('should reuse schema format in the message object', function() {
    const newApi = new AsyncAPIDocumentV2({
      asyncapi: '2.0.0',
      channels: {
        channel: {
          publish: {
            message: {
              schemaFormat: 'custom1',
              payload: {},
              traits: [
                {},
                {},
              ]
            }
          },
          subscribe: {
            message: {
              schemaFormat: 'custom2',
              payload: {},
              traits: [
                {},
                {},
              ]
            }
          }
        }
      }
    } as any);

    // apply anonymous naming
    anonymousNaming(newApi);
    const oldApi = migrateToOldAPI(newApi);
    expect(oldApi.json().channels.channel?.publish?.message?.[xParserOriginalSchemaFormat]).toEqual('custom1');
    expect((oldApi.json().channels.channel?.publish?.message as any)?.schemaFormat).toEqual(getDefaultSchemaFormat('2.0.0'));
    expect(oldApi.json().channels.channel?.subscribe?.message?.[xParserOriginalSchemaFormat]).toEqual('custom2');
    expect((oldApi.json().channels.channel?.subscribe?.message as any)?.schemaFormat).toEqual(getDefaultSchemaFormat('2.0.0'));
  });

  it('should assign x-parser-message-parsed to the message object', function() {
    const newApi = new AsyncAPIDocumentV2({
      asyncapi: '2.0.0',
      channels: {
        channel: {
          publish: {
            message: {
              payload: {},
              traits: [
                {},
                {},
              ]
            }
          },
          subscribe: {
            message: {
              payload: {},
              traits: [
                {},
                {},
              ]
            }
          }
        }
      }
    } as any);

    // apply anonymous naming
    anonymousNaming(newApi);
    const oldApi = migrateToOldAPI(newApi);
    expect(oldApi.json().channels.channel?.publish?.message?.[xParserMessageParsed]).toEqual(true);
    expect(oldApi.json().channels.channel?.subscribe?.message?.[xParserMessageParsed]).toEqual(true);
  });

  it('should assign original payload extension to the message object', function() {
    const newApi = new AsyncAPIDocumentV2({
      asyncapi: '2.0.0',
      channels: {
        channel: {
          publish: {
            message: {
              payload: {
                type: 'string',
              },
              traits: [
                {},
                {},
              ]
            }
          },
          subscribe: {
            message: {
              payload: {
                type: 'number',
              },
              traits: [
                {},
                {},
              ]
            }
          }
        }
      }
    } as any);

    // apply anonymous naming
    anonymousNaming(newApi);
    const oldApi = migrateToOldAPI(newApi);
    expect(oldApi.json().channels.channel?.publish?.message?.[xParserOriginalPayload]).toEqual({ type: 'string', 'x-parser-schema-id': '<anonymous-schema-1>' });
    expect(oldApi.json().channels.channel?.subscribe?.message?.[xParserOriginalPayload]).toEqual({ type: 'number', 'x-parser-schema-id': '<anonymous-schema-2>' });
  });

  it('should remove traits from message object and assign them to the extension', function() {
    const newApi = new AsyncAPIDocumentV2({
      channels: {
        channel: {
          publish: {
            message: {
              payload: {},
              traits: [
                {},
                {},
              ]
            }
          },
          subscribe: {
            message: {
              payload: {},
              traits: [
                {},
                {},
              ]
            }
          }
        }
      }
    } as any);

    // apply anonymous naming
    anonymousNaming(newApi);
    const oldApi = migrateToOldAPI(newApi);
    expect(oldApi.json().channels.channel?.publish?.message?.[xParserOriginalTraits]).toEqual([{}, {}]);
    expect((oldApi.json().channels.channel?.publish?.message as any)?.traits).toBeUndefined();
    expect(oldApi.json().channels.channel?.subscribe?.message?.[xParserOriginalTraits]).toEqual([{}, {}]);
    expect((oldApi.json().channels.channel?.subscribe?.message as any)?.traits).toBeUndefined();
  });

  it('should remove traits from operation object and assign them to the extension', function() {
    const newApi = new AsyncAPIDocumentV2({
      channels: {
        channel: {
          publish: {
            traits: [
              {},
              {},
            ],
          },
          subscribe: {
            traits: [
              {},
              {},
            ],
          }
        }
      }
    } as any);

    const oldApi = migrateToOldAPI(newApi);
    expect(oldApi.json().channels.channel?.publish?.[xParserOriginalTraits]).toEqual([{}, {}]);
    expect(oldApi.json().channels.channel?.publish?.traits).toBeUndefined();
    expect(oldApi.json().channels.channel?.subscribe?.[xParserOriginalTraits]).toEqual([{}, {}]);
    expect(oldApi.json().channels.channel?.subscribe?.traits).toBeUndefined();
  });
});
