import { Parser } from '../../src/parser';

import { filterDiagnostics, expectDiagnostics } from '../utils';

describe('aas2schemaParserRule', function() {
  const parser = new Parser();

  it('should validate AsyncAPI Schema with valid schema', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            message: {
              payload: {
                type: 'object',
              }
            }
          }
        }
      }
    };

    const diagnostics = await parser.validate(document);
    expectDiagnostics(diagnostics, 'asyncapi-schemas-v2', []);
  });

  it('should validate AsyncAPI Schema with invalid schema', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            message: {
              payload: {
                oneOf: 'this should be an array',
                properties: {
                  name: {
                    if: 'this should be an if'
                  }
                }
              }
            }
          }
        }
      }
    };

    const diagnostics = await parser.validate(document);
    expectDiagnostics(diagnostics, 'asyncapi-schemas-v2', [
      {
        message: 'must be array',
        path: ['channels', 'channel', 'publish', 'message', 'payload', 'oneOf']
      },
      {
        message: 'must be object,boolean',
        path: ['channels', 'channel', 'publish', 'message', 'payload', 'properties', 'name', 'if']
      }
    ]);
  });

  it('should validate AsyncAPI Schema with invalid schema (components.messages case)', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {},
      components: {
        messages: {
          message: {
            payload: {
              oneOf: 'this should be an array',
              properties: {
                name: {
                  if: 'this should be an if'
                }
              }
            }
          }
        }
      }
    };

    const diagnostics = await parser.validate(document);
    expectDiagnostics(diagnostics, 'asyncapi-schemas-v2', [
      {
        message: 'must be array',
        path: ['components', 'messages', 'message', 'payload', 'oneOf']
      },
      {
        message: 'must be object,boolean',
        path: ['components', 'messages', 'message', 'payload', 'properties', 'name', 'if']
      }
    ]);
  });

  it('should validate AsyncAPI Schema with invalid schema (components.channels case)', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {},
      components: {
        channels: {
          channel: {
            publish: {
              message: {
                payload: {
                  oneOf: 'this should be an array',
                  properties: {
                    name: {
                      if: 'this should be an if'
                    }
                  }
                }
              },
            }
          }
        }
      }
    };

    const diagnostics = await parser.validate(document);
    expectDiagnostics(diagnostics, 'asyncapi-schemas-v2', [
      {
        message: 'must be array',
        path: ['components', 'channels', 'channel', 'publish', 'message', 'payload', 'oneOf']
      },
      {
        message: 'must be object,boolean',
        path: ['components', 'channels', 'channel', 'publish', 'message', 'payload', 'properties', 'name', 'if']
      }
    ]);
  });

  it('should validate AsyncAPI Schema with invalid schema (oneOf case)', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            message: {
              oneOf: [
                {
                  payload: {
                    oneOf: 'this should be an array',
                    properties: {
                      name: {
                        if: 'this should be an if'
                      }
                    }
                  }
                },
                {
                  payload: {
                    oneOf: 'this should be an array',
                  }
                }
              ]
            }
          }
        }
      }
    };

    const diagnostics = await parser.validate(document);
    expectDiagnostics(diagnostics, 'asyncapi-schemas-v2', [
      {
        message: 'must be array',
        path: ['channels', 'channel', 'publish', 'message', 'oneOf', '0', 'payload', 'oneOf']
      },
      {
        message: 'must be object,boolean',
        path: ['channels', 'channel', 'publish', 'message', 'oneOf', '0', 'payload', 'properties', 'name', 'if']
      },
      {
        message: 'must be array',
        path: ['channels', 'channel', 'publish', 'message', 'oneOf', '1', 'payload', 'oneOf']
      }
    ]);
  });

  it('should validate AsyncAPI Schema with supported schema format', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            message: {
              schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0',
              payload: {
                type: 'object',
              }
            }
          }
        }
      }
    };

    const diagnostics = await parser.validate(document);
    expectDiagnostics(diagnostics, 'asyncapi-schemas-v2', []);
  });

  it('should validate AsyncAPI Schema with non supported schema format', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            message: {
              schemaFormat: 'not existing',
              payload: {
                type: 'object',
              }
            }
          }
        }
      }
    };

    const diagnostics = await parser.validate(document);
    expectDiagnostics(diagnostics, 'asyncapi-schemas-v2', [
      {
        message: 'Unknown schema format: "not existing"',
        path: ['channels', 'channel', 'publish', 'message', 'schemaFormat']
      },
      {
        message: 'Cannot validate and parse given schema due to unknown schema format: "not existing"',
        path: ['channels', 'channel', 'publish', 'message', 'payload']
      },
    ]);
  });

  it('should not contain errors from asyncapi-payload-unsupported-schemaFormat and asyncapi-payload rules', async function() {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            message: {
              payload: {
                oneOf: 'this should be an array',
                properties: {
                  name: {
                    if: 'this should be an if'
                  }
                }
              }
            }
          }
        }
      }
    };

    const diagnostics = await parser.validate(document);
    expect(filterDiagnostics(diagnostics, 'asyncapi-schemas-v2')).toHaveLength(2);
    expect(filterDiagnostics(diagnostics, 'asyncapi-payload-unsupported-schemaFormat')).toHaveLength(0);
    expect(filterDiagnostics(diagnostics, 'asyncapi-payload')).toHaveLength(0);
  });
});
