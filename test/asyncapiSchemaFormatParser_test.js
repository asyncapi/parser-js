const parser = require('../lib');
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const { offset, checkErrorWrapper } = require('./testsUtils');

const expect = chai.expect;

describe('asyncapiSchemaFormatParser', function() {
  it('should throw an error because of invalid schema', async function() {
    const invalidAsyncapi = fs.readFileSync(path.resolve(__dirname, './wrong/invalid-payload-asyncapi-format.json'), 'utf8');

    const parsedJSON = JSON.parse(invalidAsyncapi);
    parsedJSON.channels.mychannel.publish.message['x-parser-original-payload'] = {
      type: 'object',
      additionalProperties: [
        'invalid_array'
      ]
    };
    parsedJSON.channels.mychannel.publish.message['x-parser-original-schema-format'] = 'application/vnd.aai.asyncapi;version=2.0.0';

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/schema-validation-errors',
      title: 'This is not a valid AsyncAPI Schema Object.',
      parsedJSON,
      validationErrors: [{
        title: '/channels/mychannel/publish/message/payload/additionalProperties should be object,boolean',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          startLine: 13,
          startColumn: 38,
          startOffset: offset(252, 13),
          endLine: 15,
          endColumn: 15,
          endOffset: offset(297, 15)
        }
      },
      {
        title: '/channels/mychannel/publish/message/payload/additionalProperties should be object,boolean',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          startLine: 13,
          startColumn: 38,
          startOffset: offset(252, 13),
          endLine: 15,
          endColumn: 15,
          endOffset: offset(297, 15)
        }
      },
      {
        title: '/channels/mychannel/publish/message/payload/additionalProperties should be boolean',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          startLine: 13,
          startColumn: 38,
          startOffset: offset(252, 13),
          endLine: 15,
          endColumn: 15,
          endOffset: offset(297, 15)
        }
      },
      {
        title: '/channels/mychannel/publish/message/payload/additionalProperties should match some schema in anyOf',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          startLine: 13,
          startColumn: 38,
          startOffset: offset(252, 13),
          endLine: 15,
          endColumn: 15,
          endOffset: offset(297, 15)
        }
      }]
    };
    await checkErrorWrapper(async () => {
      await parser.parse(invalidAsyncapi);
    }, expectedErrorObject);
  });

  it('should not throw error if payload not provided', async function() {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
          "title": "My API",
          "version": "1.0.0"
      },
      "channels": {
        "mychannel": {
          "publish": {
            "message": {
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(async () => await parser.parse(parsedInput)).to.not.throw();
  });

  it('should handle true/false JSON Schemas', async function() {
    const inputSpec = {
      asyncapi: '2.0.0',
      info: {
        title: 'Example Spec',
        version: '1.0.0',
      },
      channels: {
        testChannel: {
          publish: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  trueSchema: true,
                  falseSchema: false,
                  normalSchema: {
                    type: 'string',
                  }
                },
              }
            }
          },
          subscribe: {
            message: {
              headers: true,
              payload: false,
            }
          },
        },
        testChanne2: {
          publish: {
            message: {
              payload: true,
            }
          }
        }
      },
      components: {
        schemas: {
          testSchema: {
            type: 'object',
            properties: {
              trueSchema: true,
              falseSchema: false,
              normalSchema: {
                type: 'string',
              }
            },
          },
          anySchema: true,
          cannotBeDefined: false,
        }
      }
    };
    
    let err;
    try {
      await parser.parse(inputSpec);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });

  it('should deep clone schema into x-parser-original-payload', async function() {
    const asyncapi = fs.readFileSync(path.resolve(__dirname, './good/asyncapi-complex-schema.yml'), 'utf8');
    const expectedOriginalPayload = {
      type: 'object',
      properties: {
        id: {
          description: 'Id of the streetlight.',
          minimum: 0,
          type: 'integer'
        },
        lumens: {
          description: 'Light intensity measured in lumens.',
          minimum: 0,
          type: 'integer'
        },
        sentAt: {
          description: 'Date and time when the message was sent.',
          format: 'date-time',
          type: 'string'
        }
      }
    };
    const expectedOriginalSchemaFormat = 'application/vnd.aai.asyncapi;version=2.0.0';
    
    const parsedOutput = await parser.parse(asyncapi);
    const parsedMessage = parsedOutput.channel('light/measured').publish().message().json();

    expect(parsedMessage.payload).to.have.property('x-parser-schema-id');
    expect(parsedMessage).to.have.property('x-parser-original-payload');
    expect(parsedMessage).to.have.property('x-parser-original-schema-format');
    expect(parsedMessage['x-parser-original-payload']).to.deep.equal(expectedOriginalPayload);
    expect(parsedMessage['x-parser-original-payload']).to.not.equal(parsedMessage.payload);
    expect(parsedMessage['x-parser-original-schema-format']).to.deep.equal(expectedOriginalSchemaFormat);
  });
});
