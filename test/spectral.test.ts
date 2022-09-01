import { Parser } from '../src/parser';
import { validate } from '../src/lint';

import { specVersions } from '../src/constants';

import type { ISpectralDiagnostic } from '@stoplight/spectral-core';
import type { SchemaValidateResult } from '../src/types';

describe('Custom Spectral instance', function() {
  const parser = new Parser();

  describe('asyncapi-is-asyncapi Spectral rule', function() {
    it('should throw error when input is not an AsyncAPI document (empty input case)', async function() {
      const { diagnostics } = await validate(parser, '');
      
      expect(diagnostics.length > 0).toEqual(true);
      const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-is-asyncapi');

      const expectedResult: SchemaValidateResult[] = [
        {
          message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
          path: []
        },
      ];
  
      expect(filteredDiagnostics).toEqual(expectedResult.map(e => expect.objectContaining(e)));
    });

    it('should throw error when input is not an AsyncAPI document (another spec case)', async function() {
      const document = {
        openapi: '3.0.0',
      }
      const { diagnostics } = await validate(parser, document as any);
      
      expect(diagnostics.length > 0).toEqual(true);
      const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-is-asyncapi');

      const expectedResult: SchemaValidateResult[] = [
        {
          message: 'This is not an AsyncAPI document. The "asyncapi" field as string is missing.',
          path: []
        },
      ];
  
      expect(filteredDiagnostics).toEqual(expectedResult.map(e => expect.objectContaining(e)));
    });

    it('should throw error when input is an unsupported version of AsyncAPI', async function() {
      const document = {
        asyncapi: '2.1.37',
      }
      const { diagnostics } = await validate(parser, document as any);
      
      expect(diagnostics.length > 0).toEqual(true);
      const filteredDiagnostics = filterDiagnostics(diagnostics, 'asyncapi-is-asyncapi');

      const expectedResult: SchemaValidateResult[] = [
        {
          message: `Version "2.1.37" is not supported. Please use "${specVersions[specVersions.length - 1]}" (latest) version of the specification.`,
          path: []
        },
      ];
  
      expect(filteredDiagnostics).toEqual(expectedResult.map(e => expect.objectContaining(e)));
    });
  });
});

function filterDiagnostics(diagnostics: ISpectralDiagnostic[], code: string) {
  return diagnostics.filter(d => d.code === code);
}