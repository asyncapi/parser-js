import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi3-required-operation-channel-unambiguity', [
  {
    name: 'valid case - required operation (under root) channel field points to a required channel (under root)',
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
    name: 'valid case - required operation (under root) channel field points to a required channel (under root) from an external doc',
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
            $ref: 'http://foo.bar/components/file.yml#/channels/UserSignedUp'
          },
          messages: [
            {
              $ref: 'http://foo.bar/components/file.yml#/channels/UserSignedUp/messages/UserSignedUp'
            }
          ]
        }
      }
    },
    errors: [],
  },
  {
    name: 'valid case - required operation (under components) channel field points to a required channel (under root)',
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
        }
      }
    },
    errors: [],
  },
  {
    name: 'valid case - optional operation (under components) channel field points to an optional channel (under components)',
    document: {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0'
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
    name: 'invalid case - required operation (in root) channel field points to an optional channel (under components)',
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
        message: 'The channel field of a required operation should point to a required channel.',
        path: ['operations', 'UserSignedUp', 'channel'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
  {
    name: 'invalid case - required operation (in root) channel field points to an optional channel (under components) from an external doc',
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
            $ref: 'http://foo.bar/components/file.yml#/components/channels/UserSignedUp'
          },
          messages: [
            {
              $ref: 'http://foo.bar/components/file.yml#/components/channels/UserSignedUp/messages/UserSignedUp'
            }
          ]
        }
      }
    },
    errors: [
      {
        message: 'The channel field of a required operation should point to a required channel.',
        path: ['operations', 'UserSignedUp', 'channel'],
        severity: DiagnosticSeverity.Error,
      }
    ],
  },
]);
