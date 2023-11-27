import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi3-operation-messages-from-referred-channel', [
  {
    name: 'valid case - required channel',
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
    name: 'valid case - optional channel',
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
      components: {
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
        },
      }
    },
    errors: [],
  },
  {
    name: 'invalid case - message from operation in root pointing to a message from an optional channel (same name) defined under components',
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
        message:
          'Operation message does not belong to the specified channel.',
        path: ['operations', 'UserSignedUp', 'messages', '0'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
  {
    name: 'invalid case - message from operation in components pointing to a message from a different channel defined under components',
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
      components: {
        channels: {
          UserRemoved: {
            messages: {
              UserRemoved: {
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
                $ref: '#/components/channels/UserRemoved/messages/UserRemoved'
              }
            ]
          }
        },
      }
    },
    errors: [
      {
        message:
          'Operation message does not belong to the specified channel.',
        path: ['components', 'operations', 'UserSignedUp', 'messages', '0'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
]);
