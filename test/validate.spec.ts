import { Parser } from '../src/parser';
import { hasErrorDiagnostic, hasWarningDiagnostic } from '../src/utils';

describe('validate()', function() {
  const parser = new Parser();

  describe('validate()', function() {
    it('should validate invalid document', async function() {
      const documentRaw = {
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
      };
      const diagnostics = await parser.validate(documentRaw);

      expect(diagnostics.length > 0).toEqual(true);
      expect(hasErrorDiagnostic(diagnostics)).toEqual(true);
      expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
    });

    it('should validate valid document', async function() {
      const documentRaw = {
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
        channels: {}
      };
      const diagnostics = await parser.validate(documentRaw);
      
      expect(diagnostics.length > 0).toEqual(true);
      expect(hasErrorDiagnostic(diagnostics)).toEqual(false);
      expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
    });

    it('should validate valid document - do not allow warning severity', async function() {
      const documentRaw = {
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
        channels: {}
      };
      const { document, diagnostics } = await parser.parse(documentRaw, { validateOptions: { allowedSeverity: { warning: false } } });
      
      expect(document).toBeUndefined();
      expect(diagnostics.length > 0).toEqual(true);
      expect(hasErrorDiagnostic(diagnostics)).toEqual(false);
      expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
    });
  });
});
