import { Parser } from '../../src/parser';
import { validate } from '../../src/lint';

import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { SchemaValidateResult } from '../../src/types';

describe('aas2schemaParserRule', function() {
  const parser = new Parser();

  it.only('should validate AsyncAPI Schema with valid schema', async function() {
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
    const { diagnostics } = await validate(parser, document);
    const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-schemas-v2');
    expect(filteredDiagnostics).toHaveLength(0);
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
    const { diagnostics } = await validate(parser, document);
    const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-schemas-v2');

    const expectedResult: SchemaValidateResult[] = [
      {
        message: 'must be array',
        path: ['channels', 'channel', 'publish', 'message', 'payload', 'oneOf']
      },
      {
        message: 'must be object,boolean',
        path: ['channels', 'channel', 'publish', 'message', 'payload', 'properties', 'name', 'if']
      }
    ];

    expect(filteredDiagnostics).toEqual(expectedResult.map(e => expect.objectContaining(e)));
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
    const { diagnostics } = await validate(parser, document);
    const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-schemas-v2');

    const expectedResult: SchemaValidateResult[] = [
      {
        message: 'must be array',
        path: ['components', 'messages', 'message', 'payload', 'oneOf']
      },
      {
        message: 'must be object,boolean',
        path: ['components', 'messages', 'message', 'payload', 'properties', 'name', 'if']
      }
    ];

    expect(filteredDiagnostics).toEqual(expectedResult.map(e => expect.objectContaining(e)));
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
    const { diagnostics } = await validate(parser, document);
    const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-schemas-v2');

    const expectedResult: SchemaValidateResult[] = [
      {
        message: 'must be array',
        path: ['components', 'channels', 'channel', 'publish', 'message', 'payload', 'oneOf']
      },
      {
        message: 'must be object,boolean',
        path: ['components', 'channels', 'channel', 'publish', 'message', 'payload', 'properties', 'name', 'if']
      }
    ];

    expect(filteredDiagnostics).toEqual(expectedResult.map(e => expect.objectContaining(e)));
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
    const { diagnostics } = await validate(parser, document);
    const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-schemas-v2');

    const expectedResult: SchemaValidateResult[] = [
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
    ];

    expect(filteredDiagnostics).toEqual(expectedResult.map(e => expect.objectContaining(e)));
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
    const { diagnostics } = await validate(parser, document);
    const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-schemas-v2');
    expect(filteredDiagnostics).toHaveLength(0);
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
    const { diagnostics } = await validate(parser, document);
    const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-schemas-v2');

    const expectedResult: SchemaValidateResult[] = [
      {
        message: 'Unknown schema format: "not existing"',
        path: ['channels', 'channel', 'publish', 'message', 'schemaFormat']
      },
    ];

    expect(filteredDiagnostics).toEqual(expectedResult.map(e => expect.objectContaining(e)));
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
    const { diagnostics } = await validate(parser, document);

    expect(filterDiagnostics(diagnostics, 'asyncapi-schemas-v2')).toHaveLength(2);
    expect(filterDiagnostics(diagnostics, 'asyncapi-payload-unsupported-schemaFormat')).toHaveLength(0);
    expect(filterDiagnostics(diagnostics, 'asyncapi-payload')).toHaveLength(0);
  });
});

function filterDiagnostics(diagnostics: ISpectralDiagnostic[], code: string) {
  return diagnostics.filter(d => d.code === code);
}
