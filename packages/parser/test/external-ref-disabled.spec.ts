import { Parser } from '../src/parser';

describe('external reference resolution disabled', function() {
  it('should not resolve external http references when disabled in constructor', async function() {
    const parser = new Parser({
      __unstable: {
        resolver: {
          resolveExternal: false
        }
      }
    });

    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Test AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publish',
            message: {
              $ref: 'https://example.com/nonexistent-schema.json'
            }
          },
        }
      },
    };

    // When external resolution is disabled, validation should fail with an error about unresolved reference
    const diagnostics = await parser.validate(documentRaw);
    
    // Should have errors about unresolved references
    expect(diagnostics.length).toBeGreaterThan(0);
    const hasRefError = diagnostics.some(d => 
      d.message?.toLowerCase().includes('reference') || 
      d.message?.toLowerCase().includes('resolve') || 
      d.message?.toLowerCase().includes('$ref') ||
      d.message?.toLowerCase().includes('unable') ||
      d.message?.toLowerCase().includes('unresolved')
    );
    expect(hasRefError).toBe(true);
  });

  it('should not resolve external https references when disabled in validate method', async function() {
    const parser = new Parser();

    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Test AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publish',
            message: {
              $ref: 'https://example.com/schema.json'
            }
          },
        }
      },
    };

    const diagnostics = await parser.validate(documentRaw, {
      __unstable: {
        resolver: {
          resolveExternal: false
        }
      }
    });
    
    expect(diagnostics.length).toBeGreaterThan(0);
    const hasRefError = diagnostics.some(d => 
      d.message?.toLowerCase().includes('reference') || 
      d.message?.toLowerCase().includes('resolve') || 
      d.message?.toLowerCase().includes('unable') ||
      d.message?.toLowerCase().includes('unresolved')
    );
    expect(hasRefError).toBe(true);
  });

  it('should not resolve external file references when disabled', async function() {
    const parser = new Parser({
      __unstable: {
        resolver: {
          resolveExternal: false
        }
      }
    });

    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Test AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publish',
            message: {
              $ref: './some-external-file.yaml'
            }
          },
        }
      },
    };

    const diagnostics = await parser.validate(documentRaw);
    expect(diagnostics.length).toBeGreaterThan(0);
    const hasRefError = diagnostics.some(d => 
      d.message?.toLowerCase().includes('reference') || 
      d.message?.toLowerCase().includes('resolve') || 
      d.message?.toLowerCase().includes('unable') ||
      d.message?.toLowerCase().includes('unresolved')
    );
    expect(hasRefError).toBe(true);
  });

  it('should still resolve internal references when external resolution is disabled', async function() {
    const parser = new Parser({
      __unstable: {
        resolver: {
          resolveExternal: false
        }
      }
    });

    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Test AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publish',
            message: {
              $ref: '#/components/messages/message'
            }
          },
        }
      },
      components: {
        messages: {
          message: {
            payload: {
              type: 'string'
            }
          }
        }
      }
    };

    const { document, diagnostics } = await parser.parse(documentRaw);
    
    // Document should be parsed successfully
    expect(document).toBeDefined();
    expect(document).toBeInstanceOf(Object);
    
    // Internal reference should be resolved - the message should not have $ref anymore
    const refMessage = document?.channels().get('channel')?.operations().get('publish')?.messages()[0];
    expect(refMessage).toBeDefined();
    expect(refMessage?.json('$ref' as any)).toBeUndefined();
    
    // The message should have been resolved to the component
    expect(refMessage?.json()).toEqual(document?.components().messages().get('message')?.json());
  });
});
