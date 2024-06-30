import { testRule, DiagnosticSeverity } from '../../tester';

testRule('asyncapi2-unused-securityScheme', [
  {
    name: 'valid case',
    document: {
      asyncapi: '2.0.0',
      servers: {
        someServer: {
          security: [
            {
              someScheme1: [],
            }
          ]
        }
      },
      channels: {
        someChannel: {
          publish: {
            security: [
              {
                someScheme2: [],
              }
            ]
          }
        }
      },
      components: {
        securitySchemes: {
          someScheme1: {},
          someScheme2: {},
        }
      }
    },
    errors: [],
  },

  {
    name: 'possible scheme is unused (server case)',
    document: {
      asyncapi: '2.0.0',
      servers: {
        someServer: {
          security: [
            {
              someSchema: [],
            }
          ]
        }
      },
      components: {
        securitySchemes: {
          someSchema: {},
          unusedSchema: {},
        }
      }
    },
    errors: [
      {
        message: 'Potentially unused security scheme has been detected in AsyncAPI document.',
        path: ['components', 'securitySchemes', 'unusedSchema'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },

  {
    name: 'possible scheme is unused (operation case)',
    document: {
      asyncapi: '2.0.0',
      channels: {
        someChannel: {
          publish: {
            security: [
              {
                someSchema: [],
              }
            ]
          }
        }
      },
      components: {
        securitySchemes: {
          someSchema: {},
          unusedSchema: {},
        }
      }
    },
    errors: [
      {
        message: 'Potentially unused security scheme has been detected in AsyncAPI document.',
        path: ['components', 'securitySchemes', 'unusedSchema'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },

  {
    name: 'possible scheme is unused (both cases)',
    document: {
      asyncapi: '2.0.0',
      servers: {
        someServer: {
          security: [
            {
              someScheme1: [],
            }
          ]
        }
      },
      channels: {
        someChannel: {
          publish: {
            security: [
              {
                someSchema: [],
              }
            ]
          }
        }
      },
      components: {
        securitySchemes: {
          someSchema: {},
          unusedSchema1: {},
          unusedSchema2: {},
        }
      }
    },
    errors: [
      {
        message: 'Potentially unused security scheme has been detected in AsyncAPI document.',
        path: ['components', 'securitySchemes', 'unusedSchema1'],
        severity: DiagnosticSeverity.Information,
      },
      {
        message: 'Potentially unused security scheme has been detected in AsyncAPI document.',
        path: ['components', 'securitySchemes', 'unusedSchema2'],
        severity: DiagnosticSeverity.Information,
      },
    ],
  },
]);
