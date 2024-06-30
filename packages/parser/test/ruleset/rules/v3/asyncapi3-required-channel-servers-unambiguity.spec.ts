import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi3-required-channel-servers-unambiguity', [
  {
    name: 'valid case - required channel (under root) server field points to a subset of required servers (under root)',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      servers: {
        prod: {
          host: 'my-api.com',
          protocol: 'ws',
        },
        dev: {
          host: 'localhost',
          protocol: 'ws',
        },
      },
      channels: {
        UserSignedUp: {
          servers: [
            { $ref: '#/servers/prod' },
            { $ref: '#/servers/dev' },
          ]
        }
      },
    },
    errors: [],
  },
  {
    name: 'valid case - required channel (under root) server field points to a subset of required servers (under root) from an external doc',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      channels: {
        UserSignedUp: {
          servers: [
            { $ref: 'http://foo.bar/components/file.yml#/servers/prod' },
            { $ref: 'http://foo.bar/components/file.yml#/servers/dev' },
          ]
        }
      },
    },
    errors: [],
  },
  {
    name: 'valid case - optional channel (under components) server field points to a subset of required servers (under root)',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      servers: {
        prod: {
          host: 'my-api.com',
          protocol: 'ws',
        },
        dev: {
          host: 'localhost',
          protocol: 'ws',
        },
      },
      components: {
        channels: {
          UserSignedUp: {
            servers: [
              { $ref: '#/servers/prod' },
              { $ref: '#/servers/dev' },
            ]
          }
        },
      },
    },
    errors: [],
  },
  {
    name: 'valid case - optional channel (under components) server field points to a subset of optional servers (under components)',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      components: {
        servers: {
          prod: {
            host: 'my-api.com',
            protocol: 'ws',
          },
          dev: {
            host: 'localhost',
            protocol: 'ws',
          },
        },
        channels: {
          UserSignedUp: {
            messages: {
              UserSignedUp: {
                payload: {
                  type: 'object',
                  properties: {
                    displayName: {
                      type: 'string'
                    },
                    email: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        },
        operations: {
          UserSignedUp: {
            action: 'send',
            channel: {
              $ref: '#/components/channels/UserSignedUp'
            },
            messages: [
              {
                $ref: '#/components/channels/UserSignedUp/messages/UserSignedUp'
              }
            ]
          }
        }
      }
    },
    errors: [],
  },
  {
    name: 'invalid case - required channel (in root) servers field points to a subset of optional servers (under components)',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      channels: {
        UserSignedUp: {
          servers: [
            { $ref: '#/components/servers/prod' },
            { $ref: '#/components/servers/dev' },
          ]
        }
      },
      components: {
        servers: {
          prod: {
            host: 'my-api.com',
            protocol: 'ws',
          },
          dev: {
            host: 'localhost',
            protocol: 'ws',
          },
        }
      }
    },
    errors: [
      {
        message: 'The "servers" field of a channel under the root "channels" object must always reference a subset of the servers under the root "servers" object.',
        path: ['channels', 'UserSignedUp', 'servers', '0', '$ref'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'The "servers" field of a channel under the root "channels" object must always reference a subset of the servers under the root "servers" object.',
        path: ['channels', 'UserSignedUp', 'servers', '1', '$ref'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
  {
    name: 'invalid case - required channel (in root) servers field points to a subset of optional servers (under components) from an external doc',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      channels: {
        UserSignedUp: {
          servers: [
            { $ref: 'http://foo.bar/components/file.yml#/components/servers/prod' },
            { $ref: 'http://foo.bar/components/file.yml#/components/servers/dev' },
          ]
        }
      }
    },
    errors: [
      {
        message: 'The "servers" field of a channel under the root "channels" object must always reference a subset of the servers under the root "servers" object.',
        path: ['channels', 'UserSignedUp', 'servers', '0', '$ref'],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: 'The "servers" field of a channel under the root "channels" object must always reference a subset of the servers under the root "servers" object.',
        path: ['channels', 'UserSignedUp', 'servers', '1', '$ref'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
]);
