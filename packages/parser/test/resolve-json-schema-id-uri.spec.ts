import { resolveJsonSchemaIdUri } from '../src/resolve-json-schema-id-uri';

describe('resolveJsonSchemaIdUri()', function() {
  describe('basic $id / $ref resolution', function() {
    it('should resolve relative $ref against absolute $id base URI', function() {
      const doc = {
        components: {
          schemas: {
            mySchema: {
              $id: 'http://example.com/',
              type: 'object',
              properties: {
                sentAt: {
                  $ref: '/components/schemas/sentAt'
                }
              }
            },
            sentAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.components.schemas.mySchema.properties.sentAt.$ref)
        .toEqual('http://example.com/components/schemas/sentAt');
    });

    it('should resolve relative $ref with path against absolute $id', function() {
      const doc = {
        payload: {
          $id: 'http://localhost.com/',
          type: 'object',
          properties: {
            sentAt: {
              $ref: '/components/schemas/sentAt'
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.payload.properties.sentAt.$ref)
        .toEqual('http://localhost.com/components/schemas/sentAt');
    });

    it('should not modify fragment-only $ref (starting with #)', function() {
      const doc = {
        payload: {
          $id: 'http://example.com/',
          type: 'object',
          properties: {
            sentAt: {
              $ref: '#/definitions/sentAt'
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.payload.properties.sentAt.$ref)
        .toEqual('#/definitions/sentAt');
    });

    it('should not modify already-absolute $ref', function() {
      const doc = {
        payload: {
          $id: 'http://example.com/',
          type: 'object',
          properties: {
            sentAt: {
              $ref: 'http://other.com/schemas/sentAt'
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.payload.properties.sentAt.$ref)
        .toEqual('http://other.com/schemas/sentAt');
    });

    it('should not modify $ref when no $id is present in ancestors', function() {
      const doc = {
        payload: {
          type: 'object',
          properties: {
            sentAt: {
              $ref: '/components/schemas/sentAt'
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.payload.properties.sentAt.$ref)
        .toEqual('/components/schemas/sentAt');
    });
  });

  describe('nested $id resolution', function() {
    it('should resolve $ref against the closest ancestor $id', function() {
      const doc = {
        outer: {
          $id: 'http://example.com/outer/',
          type: 'object',
          properties: {
            inner: {
              $id: 'http://example.com/inner/',
              type: 'object',
              properties: {
                ref: {
                  $ref: 'schema.json'
                }
              }
            },
            outerRef: {
              $ref: 'other.json'
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      // innerRef should resolve against inner $id
      expect(doc.outer.properties.inner.properties.ref.$ref)
        .toEqual('http://example.com/inner/schema.json');
      // outerRef should resolve against outer $id
      expect(doc.outer.properties.outerRef.$ref)
        .toEqual('http://example.com/outer/other.json');
    });

    it('should resolve relative $id against parent $id', function() {
      const doc = {
        schema: {
          $id: 'http://example.com/root/',
          type: 'object',
          properties: {
            nested: {
              $id: 'nested/',
              type: 'object',
              properties: {
                ref: {
                  $ref: 'schema.json'
                }
              }
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      // nested $id 'nested/' resolves against 'http://example.com/root/' => 'http://example.com/root/nested/'
      // $ref 'schema.json' resolves against 'http://example.com/root/nested/' => 'http://example.com/root/nested/schema.json'
      expect(doc.schema.properties.nested.properties.ref.$ref)
        .toEqual('http://example.com/root/nested/schema.json');
    });
  });

  describe('array handling', function() {
    it('should resolve $ref inside array items', function() {
      const doc = {
        schema: {
          $id: 'http://example.com/',
          type: 'object',
          oneOf: [
            {
              $ref: 'first.json'
            },
            {
              $ref: 'second.json'
            }
          ]
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.schema.oneOf[0].$ref).toEqual('http://example.com/first.json');
      expect(doc.schema.oneOf[1].$ref).toEqual('http://example.com/second.json');
    });
  });

  describe('edge cases', function() {
    it('should handle non-object input gracefully', function() {
      expect(resolveJsonSchemaIdUri(null as any)).toBeNull();
      expect(resolveJsonSchemaIdUri(undefined as any)).toBeUndefined();
      expect(resolveJsonSchemaIdUri('string' as any)).toEqual('string');
    });

    it('should handle empty document', function() {
      const doc = {};
      resolveJsonSchemaIdUri(doc);
      expect(doc).toEqual({});
    });

    it('should handle circular references without infinite loop', function() {
      const inner: any = {
        $id: 'http://example.com/',
        type: 'object',
        properties: {}
      };
      // Create circular reference
      inner.properties.self = inner;

      const doc = { schema: inner };
      // Should not throw or infinite loop
      resolveJsonSchemaIdUri(doc);
    });

    it('should handle $id with https scheme', function() {
      const doc = {
        payload: {
          $id: 'https://secure.example.com/',
          type: 'object',
          properties: {
            ref: {
              $ref: '/path/to/schema'
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.payload.properties.ref.$ref)
        .toEqual('https://secure.example.com/path/to/schema');
    });

    it('should preserve $id value as-is', function() {
      const doc = {
        schema: {
          $id: 'http://example.com/schemas/',
          type: 'object'
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.schema.$id).toEqual('http://example.com/schemas/');
    });
  });

  describe('AsyncAPI-like document structure', function() {
    it('should handle the exact scenario from issue #403', function() {
      const doc = {
        asyncapi: '2.2.0',
        info: {
          title: 'Test overriding dereferenced objects',
          version: '1.0.0'
        },
        channels: {
          test: {
            publish: {
              message: {
                $ref: '#/components/messages/myMessage'
              }
            }
          }
        },
        components: {
          messages: {
            myMessage: {
              schemaFormat: 'application/schema+json;version=draft-07',
              name: 'MyMessage',
              payload: {
                $id: 'http://localhost.com/',
                type: 'object',
                properties: {
                  sentAt: {
                    $ref: '/components/schemas/sentAt'
                  }
                }
              }
            }
          },
          schemas: {
            sentAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the message was sent.'
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      // The $ref inside payload should be resolved against the $id base URI
      expect(doc.components.messages.myMessage.payload.properties.sentAt.$ref)
        .toEqual('http://localhost.com/components/schemas/sentAt');

      // The $ref to #/components/messages/myMessage should remain unchanged (fragment-only)
      expect(doc.channels.test.publish.message.$ref)
        .toEqual('#/components/messages/myMessage');
    });

    it('should handle v3 AsyncAPI document with $id in schema', function() {
      const doc = {
        asyncapi: '3.0.0',
        info: {
          title: 'Test $id resolution',
          version: '1.0.0'
        },
        channels: {
          testChannel: {
            address: 'test',
            messages: {
              myMessage: {
                payload: {
                  schemaFormat: 'application/schema+json;version=draft-07',
                  schema: {
                    $id: 'http://example.com/schemas/',
                    type: 'object',
                    properties: {
                      data: {
                        $ref: 'data.json'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };

      resolveJsonSchemaIdUri(doc);

      expect(doc.channels.testChannel.messages.myMessage.payload.schema.properties.data.$ref)
        .toEqual('http://example.com/schemas/data.json');
    });
  });
});
