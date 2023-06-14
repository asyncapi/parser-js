import { Spectral } from '@stoplight/spectral-core';
import { truthy } from '@stoplight/spectral-functions';
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
          extends: [],
          rules: {
            'asyncapi-defaultContentType': 'off',
            'asyncapi-termsOfService': {
              description: 'Info "termsOfService" should be present and non-empty string.',
              message: 'Info "termsOfService" should be present and non-empty string.',
              recommended: true,
              given: '$',
              then: {
                field: 'info.termsOfService',
                function: truthy,
              },
            },
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

      const filteredDiagnostic = diagnostics.filter(d => d.code === 'asyncapi-termsOfService');
      expect(filteredDiagnostic).toHaveLength(1);
      expect(filteredDiagnostic[0].message).toEqual('Info "termsOfService" should be present and non-empty string.');
      expect(diagnostics.filter(d => d.code === 'asyncapi-defaultContentType')).toHaveLength(0);
    });
  });
});
