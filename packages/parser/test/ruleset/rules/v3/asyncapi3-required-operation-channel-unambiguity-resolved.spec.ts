import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi3-required-operation-channel-unambiguity-resolved', [
  {
    name: 'valid case - root operation channel resolves to root channel',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
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
            $ref: '#/channels/UserSignedUp'
          },
          messages: [
            {
              $ref: '#/channels/UserSignedUp/messages/UserSignedUp'
            }
          ]
        }
      }
    },
    errors: [],
  },
  {
    name: 'valid case - document with no operations',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
      channels: {
        UserSignedUp: {
          address: 'user/signedup'
        }
      },
    },
    errors: [],
  },
  {
    name: 'valid case - document with no channels',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
      },
    },
    errors: [],
  },
  {
    name: 'invalid case - root operation channel resolves to component channel',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
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
      },
      components: {
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
      },
    },
    errors: [
      {
        message: 'Operation references a channel that is not defined in the root "channels" object.',
        path: ['operations', 'UserSignedUp', 'channel'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
]);
