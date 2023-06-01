import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-message-examples', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              payload: {
                type: 'string',
              },
              headers: {
                type: 'object',
              },
              examples: [
                {
                  payload: 'foobar',
                  headers: {
                    someKey: 'someValue',
                  },
                },
              ],
            },
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'invalid case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              payload: {
                type: 'string',
              },
              headers: {
                type: 'object',
              },
              examples: [
                {
                  payload: 2137,
                  headers: {
                    someKey: 'someValue',
                  },
                },
              ],
            },
          },
        },
      },
    },
    errors: [
      {
        message: '"payload" property type must be string',
        path: ['channels', 'someChannel', 'publish', 'message', 'examples', '0', 'payload'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case (oneOf case)',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              oneOf: [
                {
                  payload: {
                    type: 'string',
                  },
                  headers: {
                    type: 'object',
                  },
                  examples: [
                    {
                      payload: 2137,
                      headers: {
                        someKey: 'someValue',
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    errors: [
      {
        message: '"payload" property type must be string',
        path: ['channels', 'someChannel', 'publish', 'message', 'oneOf', '0', 'examples', '0', 'payload'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case (inside components.messages)',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          someMessage: {
            payload: {
              type: 'string',
            },
            headers: {
              type: 'object',
            },
            examples: [
              {
                payload: 2137,
                headers: {
                  someKey: 'someValue',
                },
              },
            ],
          },
        },
      },
    },
    errors: [
      {
        message: '"payload" property type must be string',
        path: ['components', 'messages', 'someMessage', 'examples', '0', 'payload'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'invalid case (with multiple errors)',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          someMessage: {
            payload: {
              type: 'object',
              required: ['key1', 'key2'],
              properties: {
                key1: {
                  type: 'string',
                },
                key2: {
                  type: 'string',
                },
              },
            },
            headers: {
              type: 'object',
            },
            examples: [
              {
                payload: {
                  key1: 2137,
                },
                headers: 'someValue',
              },
            ],
          },
        },
      },
    },
    errors: [
      {
        message: '"payload" property must have required property "key2"',
        path: ['components', 'messages', 'someMessage', 'examples', '0', 'payload'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: '"key1" property type must be string',
        path: ['components', 'messages', 'someMessage', 'examples', '0', 'payload', 'key1'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: '"headers" property type must be object',
        path: ['components', 'messages', 'someMessage', 'examples', '0', 'headers'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'case with omitted payload',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          someMessage: {
            examples: [
              {
                payload: {
                  key1: 2137,
                },
              },
            ],
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'case with falsy payload (valid case)',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          someMessage: {
            payload: false,
            examples: [
              {},
            ],
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'case with falsy payload (invalid case)',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          someMessage: {
            payload: false,
            examples: [
              {
                payload: {
                  key: '2137'
                }
              },
            ],
          },
        },
      },
    },
    errors: [
      {
        message: '"payload" property must not be valid',
        path: ['components', 'messages', 'someMessage', 'examples', '0', 'payload'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'case with omitted headers',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          someMessage: {
            examples: [
              {
                headers: {
                  key1: 2137,
                },
              },
            ],
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'case with falsy headers (valid case)',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          someMessage: {
            headers: false,
            examples: [
              {},
            ],
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'case with falsy headers (invalid case)',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          someMessage: {
            headers: false,
            examples: [
              {
                headers: {
                  key: '2137'
                }
              },
            ],
          },
        },
      },
    },
    errors: [
      {
        message: '"headers" property must not be valid',
        path: ['components', 'messages', 'someMessage', 'examples', '0', 'headers'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'valid avro spec case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              schemaFormat: 'application/vnd.apache.avro;version=1.9.0',
              payload: {
                type: 'record',
                name: 'Test',
                fields: [
                  {name: 'direction', type: { type: 'enum', name: 'directionEnum', symbols: ['North', 'East', 'South', 'West']}},
                  {name: 'speed', type: 'string'}
                ]
              },
              headers: {
                type: 'record',
                name: 'TestHeader',
                fields: [
                  {name: 'someKey', type: 'string'},
                  {name: 'someOtherKey', type: 'string'}
                ]
              },
              examples: [
                {
                  payload: {
                    direction: 'North',
                    speed: '18'
                  },
                  headers: {
                    someKey: 'someValue',
                    someOtherKey: 'someValue',
                  },
                },
              ],
            },
          },
        },
      },
    },
    errors: [],
  },
  
  {
    name: 'invalid example from avro spec case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              schemaFormat: 'application/vnd.apache.avro;version=1.9.0',
              payload: {
                type: 'record',
                name: 'Test',
                fields: [
                  {name: 'direction', type: { type: 'enum', name: 'directionEnum', symbols: ['North', 'East', 'South', 'West']}},
                  {name: 'speed', type: 'string'}
                ]
              },
              headers: {
                type: 'record',
                name: 'TestHeader',
                fields: [
                  {name: 'someKey', type: 'string'},
                  {name: 'someOtherKey', type: 'string'}
                ]
              },
              examples: [
                {
                  payload: {
                    direction: 'South-West',
                    speed: '18'
                  },
                  headers: {
                    someKey: 'someValue',
                    someOtherKey: 123,
                  },
                },
              ],
            },
          },
        },
      },
    },
    errors: [
      {
        message: '"direction" property must be equal to one of the allowed values: "North", "East", "South", "West"',
        path: ['channels', 'someChannel', 'publish', 'message', 'examples', '0', 'payload', 'direction'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: '"someOtherKey" property type must be string',
        path: ['channels', 'someChannel', 'publish', 'message', 'examples', '0', 'headers', 'someOtherKey'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
