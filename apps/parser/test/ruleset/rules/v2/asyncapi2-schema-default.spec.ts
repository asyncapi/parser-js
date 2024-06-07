import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-schema-default', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {
              schema: {
                default: 17,
              },
            },
          },
        },
      },
      components: {
        parameters: {
          orphanParameter: {
            schema: {
              default: 17,
            },
          },
        },
        schemas: {
          aSchema: {
            default: 17,
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'components.schemas.{schema}.default is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {
              schema: {
                default: 17,
              },
            },
          },
        },
      },
      components: {
        parameters: {
          orphanParameter: {
            schema: {
              default: 17,
            },
          },
        },
        schemas: {
          aSchema: {
            type: 'string',
            default: 17,
          },
        },
      },
    },
    errors: [
      {
        message: '"default" property type must be string',
        path: ['components', 'schemas', 'aSchema', 'default'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'components.parameters.{parameter}.schema.default is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {
              schema: {
                default: 17,
              },
            },
          },
        },
      },
      components: {
        parameters: {
          orphanParameter: {
            schema: {
              type: 'string',
              default: 17,
            },
          },
        },
        schemas: {
          aSchema: {
            default: 17,
          },
        },
      },
    },
    errors: [
      {
        message: '"default" property type must be string',
        path: ['components', 'parameters', 'orphanParameter', 'schema', 'default'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channels.{channel}.parameters.{parameter}.schema.default is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {
              schema: {
                type: 'string',
                default: 17,
              },
            },
          },
        },
      },
      components: {
        parameters: {
          orphanParameter: {
            schema: {
              default: 17,
            },
          },
        },
        schemas: {
          aSchema: {
            default: 17,
          },
        },
      },
    },
    errors: [
      {
        message: '"default" property type must be string',
        path: ['channels', 'users/{userId}/signedUp', 'parameters', 'userId', 'schema', 'default'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'components.messages.{message}.payload.default is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          publish: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  value: {
                    type: 'integer',
                  },
                },
                required: ['value'],
                default: { value: 17 },
              },
            },
          },
          subscribe: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  value: {
                    type: 'integer',
                  },
                },
                required: ['value'],
                default: { value: 17 },
              },
            },
          },
        },
      },
      components: {
        messageTraits: {
          aTrait: {
            payload: {
              type: 'object',
              properties: {
                value: {
                  type: 'integer',
                },
              },
              required: ['value'],
              default: { value: 17 },
            },
          },
        },
        messages: {
          aMessage: {
            payload: {
              type: 'object',
              properties: {
                value: {
                  type: 'integer',
                },
              },
              required: ['value'],
              default: { seventeen: 17 },
            },
          },
        },
      },
    },
    errors: [
      {
        message: '"default" property must have required property "value"',
        path: ['components', 'messages', 'aMessage', 'payload', 'default'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'components.messageTraits.{trait}.payload.default is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          publish: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  value: {
                    type: 'integer',
                  },
                },
                required: ['value'],
                default: { value: 17 },
              },
            },
          },
          subscribe: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  value: {
                    type: 'integer',
                  },
                },
                required: ['value'],
                default: { value: 17 },
              },
            },
          },
        },
      },
      components: {
        messageTraits: {
          aTrait: {
            payload: {
              type: 'object',
              properties: {
                value: {
                  type: 'integer',
                },
              },
              required: ['value'],
              default: { seventeen: 17 },
            },
          },
        },
        messages: {
          aMessage: {
            payload: {
              type: 'object',
              properties: {
                value: {
                  type: 'integer',
                },
              },
              required: ['value'],
              default: { value: 17 },
            },
          },
        },
      },
    },
    errors: [
      {
        message: '"default" property must have required property "value"',
        path: ['components', 'messageTraits', 'aTrait', 'payload', 'default'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channels.{channel}.publish.message.payload.default is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          publish: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  value: {
                    type: 'integer',
                  },
                },
                required: ['value'],
                default: { seventeen: 17 },
              },
            },
          },
          subscribe: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  value: {
                    type: 'integer',
                  },
                },
                required: ['value'],
                default: { value: 17 },
              },
            },
          },
        },
      },
      components: {
        messageTraits: {
          aTrait: {
            payload: {
              type: 'object',
              properties: {
                value: {
                  type: 'integer',
                },
              },
              required: ['value'],
              default: { value: 17 },
            },
          },
        },
        messages: {
          aMessage: {
            payload: {
              type: 'object',
              properties: {
                value: {
                  type: 'integer',
                },
              },
              required: ['value'],
              default: { value: 17 },
            },
          },
        },
      },
    },
    errors: [
      {
        message: '"default" property must have required property "value"',
        path: ['channels', 'users/{userId}/signedUp', 'publish', 'message', 'payload', 'default'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
