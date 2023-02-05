import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-document-resolved', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {},
    },
    errors: [],
  },

  {
    name: 'invalid case (channels property is missing)',
    document: {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
    },
    errors: [
      {
        message: 'Object must have required property "channels"',
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: 'valid case (case when other errors should also occur but we filter them out)',
    document: {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        someChannel: {
          publish: {
            $ref: '#/components/x-operations/someOperation',
          },
        },
      },
      components: {
        'x-operations': {
          someOperation: {},
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case (2.0.0 version)',
    document: {
      asyncapi: '2.0.0',
      info: {
        title: 'Sample app',
        version: '1.0.1',
        description: 'This is a sample server.',
        termsOfService: 'http://asyncapi.org/terms/',
      },
      channels: {
        '/user/signedup': {
          subscribe: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                },
              },
            },
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case (2.1.0 version - with message examples)',
    document: {
      asyncapi: '2.1.0',
      info: {
        title: 'Signup service example (internal)',
        version: '0.1.0',
      },
      channels: {
        '/user/signedup': {
          subscribe: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                },
              },
              examples: [
                {
                  name: 'Example 1',
                  summary: 'Example summary for example 1',
                  payload: {
                    email: 'bye@foo.bar',
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
    name: 'valid case (2.2.0 version - with channel servers)',
    document: {
      asyncapi: '2.2.0',
      info: {
        title: 'Signup service example (internal)',
        version: '0.1.0',
      },
      servers: {
        kafka: {
          url: 'development.gigantic-server.com',
          description: 'Development server',
          protocol: 'kafka',
          protocolVersion: '1.0.0',
        },
      },
      channels: {
        '/user/signedup': {
          servers: ['kafka'],
          subscribe: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                },
              },
            },
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case (2.3.0 version - with reusable server)',
    document: {
      asyncapi: '2.3.0',
      info: {
        title: 'Signup service example (internal)',
        version: '0.1.0',
      },
      servers: {
        kafka: {
          $ref: '#/components/servers/kafka',
        }
      },
      channels: {
        '/user/signedup': {
          subscribe: {
            message: {
              payload: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                },
              },
            },
          },
        },
      },
      components: {
        servers: {
          kafka: {
            url: 'development.gigantic-server.com',
            description: 'Development server',
            protocol: 'kafka',
            protocolVersion: '1.0.0',
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case (2.4.0 version - with messageId)',
    document: {
      asyncapi: '2.4.0',
      info: {
        title: 'Signup service example (internal)',
        version: '0.1.0',
      },
      channels: {
        '/user/signedup': {
          subscribe: {
            message: {
              messageId: 'messageId',
              payload: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                },
              },
            },
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case (2.5.0 version - with tags on server)',
    document: {
      asyncapi: '2.5.0',
      info: {
        title: 'Signup service example (internal)',
        version: '0.1.0',
      },
      servers: {
        development: {
          url: 'https://some-server.com/example',
          protocol: 'kafka',
          tags: [
            {
              name: 'env:production',
            },
            {
              name: 'e-commerce',
            },
          ],
        },
      },
      channels: {
        '/user/signedup': {
          subscribe: {
            message: {
              messageId: 'messageId',
              payload: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                },
              },
            },
          },
        },
      },
    },
    errors: [],
  },

  {
    name: 'valid case (2.6.0 version)',
    document: {
      asyncapi: '2.6.0',
      info: {
        title: 'Signup service example (internal)',
        version: '0.1.0',
      },
      channels: {
        '/user/signedup': {
          subscribe: {
            message: {
              messageId: 'messageId',
              payload: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                },
              },
            },
          },
        },
      },
    },
    errors: [],
  },
]);
