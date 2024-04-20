import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-message-examples-custom-format', [
  
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
    // no errors as this rule is just checking examples where schemaFormat is set
    errors: [],
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
              examples: [
                {
                  payload: {
                    direction: 'North',
                    speed: '18'
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
              examples: [
                {
                  payload: {
                    direction: 'South-West',
                    speed: '18'
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
    ],
  },

  {
    name: 'avro can contain null values',
    document: {
      asyncapi: '2.6.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              schemaFormat: 'application/vnd.apache.avro;version=1.9.0',
              payload: {
                type: 'record',
                name: 'Command',
                fields: [{
                  name: 'foo',
                  default: null,
                  type: ['null', 'string'],
                }],
              },
              examples: [
                {
                  payload: {}
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
    name: 'handles oneOf processing',
    document: {
      asyncapi: '2.6.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              oneOf: [
                {
                  schemaFormat: 'application/vnd.apache.avro;version=1.9.0',
                  payload: {
                    type: 'record',
                    name: 'Command',
                    fields: [{
                      name: 'foo',
                      default: null,
                      type: ['null', 'string'],
                    }],
                  },
                  examples: [
                    {
                      payload: {foo: 1}
                    },
                  ],
                },
                {
                  payload: {
                    type: 'string'
                  },
                  examples: [
                    {
                      // no error for this as this rule is just checking examples where schemaFormat is set
                      payload: 1 
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
        message: '"foo" property type must be string',
        path: ['channels', 'someChannel', 'publish', 'message', 'oneOf', '0', 'examples', '0', 'payload', 'foo'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: '"foo" property type must be null',
        path: ['channels', 'someChannel', 'publish', 'message', 'oneOf', '0', 'examples', '0', 'payload', 'foo'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: '"foo" property must match exactly one schema in oneOf',
        path: ['channels', 'someChannel', 'publish', 'message', 'oneOf', '0', 'examples', '0', 'payload', 'foo'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
]);
