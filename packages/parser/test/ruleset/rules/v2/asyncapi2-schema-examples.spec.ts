import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-schema-examples', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {
              schema: {
                examples: [17, 'one', 13],
              },
            },
          },
        },
      },
      components: {
        parameters: {
          orphanParameter: {
            schema: {
              examples: [17, 'one', 13],
            },
          },
        },
        schemas: {
          aSchema: {
            examples: [17, 'one', 13],
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'components.schemas.{schema}.examples.{position} is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {
              schema: {
                examples: [17, {}, 13, 'string-is-always-accepted'],
              },
            },
          },
        },
      },
      components: {
        parameters: {
          orphanParameter: {
            schema: {
              examples: [17, {}, 13, 'string-is-always-accepted'],
            },
          },
        },
        schemas: {
          aSchema: {
            type: 'object',
            examples: [17, {}, 13, 'string-is-always-accepted'],
          },
        },
      },
    },
    errors: [
      {
        message: '"0" property type must be object',
        path: ['components', 'schemas', 'aSchema', 'examples', '0'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: '"2" property type must be object',
        path: ['components', 'schemas', 'aSchema', 'examples', '2'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'components.parameters.{parameter}.schema.examples.{position} is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {
              schema: {
                examples: [17, {}, 13, 'string-is-always-accepted'],
              },
            },
          },
        },
      },
      components: {
        parameters: {
          orphanParameter: {
            schema: {
              type: 'object',
              examples: [17, {}, 13, 'string-is-always-accepted'],
            },
          },
        },
        schemas: {
          aSchema: {
            examples: [17, {}, 13, 'string-is-always-accepted'],
          },
        },
      },
    },
    errors: [
      {
        message: '"0" property type must be object',
        path: ['components', 'parameters', 'orphanParameter', 'schema', 'examples', '0'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: '"2" property type must be object',
        path: ['components', 'parameters', 'orphanParameter', 'schema', 'examples', '2'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channels.{channel}.parameters.{parameter}.schema.examples.{position} is not valid against the schema it decorates',
    document: {
      asyncapi: '2.0.0',
      channels: {
        'users/{userId}/signedUp': {
          parameters: {
            userId: {
              schema: {
                type: 'object',
                examples: [17, {}, 13, 'string-is-always-accepted'],
              },
            },
          },
        },
      },
      components: {
        parameters: {
          orphanParameter: {
            schema: {
              examples: [17, {}, 13, 'string-is-always-accepted'],
            },
          },
        },
        schemas: {
          aSchema: {
            examples: [17, {}, 13, 'string-is-always-accepted'],
          },
        },
      },
    },
    errors: [
      {
        message: '"0" property type must be object',
        path: ['channels', 'users/{userId}/signedUp', 'parameters', 'userId', 'schema', 'examples', '0'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: '"2" property type must be object',
        path: ['channels', 'users/{userId}/signedUp', 'parameters', 'userId', 'schema', 'examples', '2'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'components.messages.{message}.payload.examples.{position} is not valid against the schema it decorates',
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
                examples: [{ value: 17 }, { value: 18 }],
              }
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
                examples: [{ value: 17 }, { value: 18 }],
              }
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
              examples: [{ value: 17 }, { value: 18 }],
            }
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
              examples: [{ value: 17 }, { seventeen: 18 }],
            }
          },
        },
      },
    },
    errors: [
      {
        message: '"1" property must have required property "value"',
        path: ['components', 'messages', 'aMessage', 'payload', 'examples', '1'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'components.messageTraits.{trait}.payload.examples.{position} is not valid against the schema it decorates',
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
                examples: [{ value: 17 }, { value: 18 }],
              }
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
                examples: [{ value: 17 }, { value: 18 }],
              }
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
              examples: [{ value: 17 }, { seventeen: 18 }],
            }
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
              examples: [{ value: 17 }, { value: 18 }],
            }
          },
        },
      },
    },
    errors: [
      {
        message: '"1" property must have required property "value"',
        path: ['components', 'messageTraits', 'aTrait', 'payload', 'examples', '1'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'channels.{channel}.publish.message.payload.examples.{position} is not valid against the schema it decorates',
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
                examples: [{ value: 17 }, { seventeen: 18 }],
              }
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
                examples: [{ value: 17 }, { value: 18 }],
              }
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
              examples: [{ value: 17 }, { value: 18 }],
            }
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
              examples: [{ value: 17 }, { value: 18 }],
            }
          },
        },
      },
    },
    errors: [
      {
        message: '"1" property must have required property "value"',
        path: ['channels', 'users/{userId}/signedUp', 'publish', 'message', 'payload', 'examples', '1'],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
