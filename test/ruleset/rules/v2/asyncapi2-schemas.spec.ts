import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-schemas', [
  {
    name: 'valid case',
    document: {
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
    },
    errors: [],
  },

  {
    name: 'invalid schema',
    document: {
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
    },
    errors: [
      {
        message: 'must be array',
        path: ['channels', 'channel', 'publish', 'message', 'payload', 'oneOf'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'must be object,boolean',
        path: ['channels', 'channel', 'publish', 'message', 'payload', 'properties', 'name', 'if'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },

  {
    name: 'invalid schema (components.messages case)',
    document: {
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
    },
    errors: [
      {
        message: 'must be array',
        path: ['components', 'messages', 'message', 'payload', 'oneOf'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'must be object,boolean',
        path: ['components', 'messages', 'message', 'payload', 'properties', 'name', 'if'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },

  {
    name: 'invalid schema (components.channels case)',
    document: {
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
    },
    errors: [
      {
        message: 'must be array',
        path: ['components', 'channels', 'channel', 'publish', 'message', 'payload', 'oneOf'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'must be object,boolean',
        path: ['components', 'channels', 'channel', 'publish', 'message', 'payload', 'properties', 'name', 'if'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },

  {
    name: 'invalid schema (oneOf case)',
    document: {
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
    },
    errors: [
      {
        message: 'must be array',
        path: ['channels', 'channel', 'publish', 'message', 'oneOf', '0', 'payload', 'oneOf'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'must be object,boolean',
        path: ['channels', 'channel', 'publish', 'message', 'oneOf', '0', 'payload', 'properties', 'name', 'if'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'must be array',
        path: ['channels', 'channel', 'publish', 'message', 'oneOf', '1', 'payload', 'oneOf'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },

  {
    name: 'valid case with supported schema format',
    document: {
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
    },
    errors: [],
  },

  {
    name: 'invalid case with non supported schema format',
    document: {
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
    },
    errors: [
      {
        message: 'Unknown schema format: "not existing"',
        path: ['channels', 'channel', 'publish', 'message', 'schemaFormat'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'Cannot validate and parse given schema due to unknown schema format: "not existing"',
        path: ['channels', 'channel', 'publish', 'message', 'payload'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
