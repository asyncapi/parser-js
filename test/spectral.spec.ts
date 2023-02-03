import { createRulesetFunction, Spectral } from '@stoplight/spectral-core';
import { DiagnosticSeverity } from '../src';
import { Parser } from '../src/parser';
import { createSpectral } from '../src/spectral';

describe('Custom Spectral instance', function() {
  describe('createSpectral()', function() {
    it('should create Spectral instance', async function() {
      const parser = new Parser();
      const spectral = createSpectral(parser);
      expect(spectral).toBeInstanceOf(Spectral);
    });
  });

  describe('custom rules', function() {
    it('should disable core rules', async function() {
      const parser = new Parser({
        ruleset: {
          core: false,
        }
      });

      const documentRaw = {
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
        channels: {
          channel: {
            publish: {
              operationId: 'publish',
              message: {
                payload: {
                  type: 'string'
                }
              }
            },
          }
        },
      };
      const { diagnostics } = await parser.parse(documentRaw);

      const filteredDiagnostic = diagnostics.filter(d => d.severity === DiagnosticSeverity.Error);
      expect(filteredDiagnostic).toHaveLength(0);
    });

    it('should disable recommended rules', async function() {
      const parser = new Parser({
        ruleset: {
          recommended: false,
        }
      });

      const documentRaw = {
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
        channels: {
          channel: {
            publish: {
              operationId: 'publish',
              message: {
                payload: {
                  type: 'string'
                }
              }
            },
          }
        },
      };
      const { diagnostics } = await parser.parse(documentRaw);

      const filteredDiagnostic = diagnostics.filter(d => d.severity === DiagnosticSeverity.Warning);
      expect(filteredDiagnostic).toHaveLength(0);
    });

    it('should use custom rules passed in options', async function() {
      const parser = new Parser({
        ruleset: {
          rules: {
            'asyncapi-custom': {
              formats: [() => true], // for every input
              given: '$',
              severity: 'warn',
              then: {
                function: createRulesetFunction<null, null>({ input: null, options: null }, () => {
                  return [
                    {
                      message: 'Message from custom ruleset',
                      path: [],
                    }
                  ];
                }),
              }
            }
          }
        }
      });

      const documentRaw = {
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
        channels: {
          channel: {
            publish: {
              operationId: 'publish',
              message: {
                payload: {
                  type: 'string'
                }
              }
            },
          }
        },
      };
      const { diagnostics } = await parser.parse(documentRaw);

      const filteredDiagnostic = diagnostics.filter(d => d.code === 'asyncapi-custom');
      expect(filteredDiagnostic).toHaveLength(1);
      expect(filteredDiagnostic[0].message).toEqual('Message from custom ruleset');
    });
  });
});
