import { testRule, DiagnosticSeverity } from '../tester';

testRule('asyncapi-unused-component', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              $ref: '#/components/messages/someMessage'
            }
          }
        }
      },
      components: {
        messages: {
          someMessage: {},
        }
      }
    },
    errors: [],
  },

  {
    name: 'possible component is unused (core component)',
    document: {
      asyncapi: '2.0.0',
      components: {
        messages: {
          unusedMessage: {},
        }
      }
    },
    errors: [
      {
        message: 'Potentially unused component has been detected in AsyncAPI document.',
        path: ['components', 'messages', 'unusedMessage'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },

  {
    name: 'possible component is unused (core component) - mixed use case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              $ref: '#/components/messages/someMessage'
            }
          }
        }
      },
      components: {
        messages: {
          someMessage: {},
          unusedMessage: {},
        }
      }
    },
    errors: [
      {
        message: 'Potentially unused component has been detected in AsyncAPI document.',
        path: ['components', 'messages', 'unusedMessage'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },

  {
    name: 'possible component is unused (extension component)',
    document: {
      asyncapi: '2.0.0',
      components: {
        'x-messages': {
          unusedMessage: {},
        }
      }
    },
    errors: [
      {
        message: 'Potentially unused component has been detected in AsyncAPI document.',
        path: ['components', 'x-messages', 'unusedMessage'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },

  {
    name: 'possible component is unused (extension component) - mixed use case',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              $ref: '#/components/x-messages/someMessage'
            }
          }
        }
      },
      components: {
        'x-messages': {
          someMessage: {},
          unusedMessage: {},
        }
      }
    },
    errors: [
      {
        message: 'Potentially unused component has been detected in AsyncAPI document.',
        path: ['components', 'x-messages', 'unusedMessage'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },

  {
    name: 'possible component is unused - different kind of components',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              $ref: '#/components/messages/someMessage'
            }
          }
        }
      },
      components: {
        messages: {
          someMessage: {
            payload: {
              $ref: '#/components/schemas/someSchema',
            }
          },
          unusedMessage: {},
        },
        schemas: {
          someSchema: {},
          unusedSchema: {},
        }
      }
    },
    errors: [
      {
        message: 'Potentially unused component has been detected in AsyncAPI document.',
        path: ['components', 'messages', 'unusedMessage'],
        severity: DiagnosticSeverity.Information,
      },
      {
        message: 'Potentially unused component has been detected in AsyncAPI document.',
        path: ['components', 'schemas', 'unusedSchema'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },

  {
    name: 'possible component is unused - skip security schemes',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            message: {
              $ref: '#/components/messages/someMessage'
            }
          }
        }
      },
      components: {
        messages: {
          someMessage: {
            payload: {
              $ref: '#/components/schemas/someSchema',
            }
          },
        },
        schemas: {
          someSchema: {},
        },
        securitySchemes: {
          unusedScheme1: {},
          unusedScheme2: {},
        }
      }
    },
    errors: [],
  },
]);
