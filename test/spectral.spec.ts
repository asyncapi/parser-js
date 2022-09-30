import { Spectral } from '@stoplight/spectral-core';
import { Parser } from '../src/parser';
import { createSpectral } from '../src/spectral';
import { specVersions } from '../src/constants';

import { expectDiagnostics } from './utils';

describe('Custom Spectral instance', function() {
  const parser = new Parser();

  describe('createSpectral()', function() {
    it('should create Spectral instance', async function() {
      const spectral = createSpectral(parser);
      expect(spectral).toBeInstanceOf(Spectral);
    });
  });

  describe('asyncapi-is-asyncapi Spectral rule', function() {
    it('should throw error when input is not an AsyncAPI document (empty input case)', async function() {
      const diagnostics = await parser.validate('');
      
      expect(diagnostics.length > 0).toEqual(true);
      expectDiagnostics(diagnostics, 'asyncapi-is-asyncapi', [
        {
          message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
          path: []
        },
      ]);
    });

    it('should throw error when input is not an AsyncAPI document (another spec case)', async function() {
      const document = {
        openapi: '3.0.0',
      };
      const diagnostics = await parser.validate(document as any);
      
      expect(diagnostics.length > 0).toEqual(true);
      expectDiagnostics(diagnostics, 'asyncapi-is-asyncapi', [
        {
          message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
          path: []
        },
      ]);
    });

    it('should throw error when input is an unsupported version of AsyncAPI', async function() {
      const document = {
        asyncapi: '2.1.37',
      };
      const diagnostics = await parser.validate(document as any);
      
      expect(diagnostics.length > 0).toEqual(true);
      expectDiagnostics(diagnostics, 'asyncapi-is-asyncapi', [
        {
          message: `Version "2.1.37" is not supported. Please use "${specVersions[specVersions.length - 1]}" (latest) version of the specification.`,
          path: []
        },
      ]);
    });
  });
});
