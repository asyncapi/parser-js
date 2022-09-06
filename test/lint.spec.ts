import { lint, validate } from '../src/lint';
import { Parser } from '../src/parser';
import { hasErrorDiagnostic, hasWarningDiagnostic } from '../src/utils';

describe('lint() & validate()', function() {
  const parser = new Parser();

  describe('lint()', function() {
    it('should lint invalid document', async function() {
      const document = {
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
      };

      const diagnostics = await lint(parser, document);
      if (!diagnostics) {
        return;
      }

      expect(diagnostics.length > 0).toEqual(true);
      expect(hasErrorDiagnostic(diagnostics)).toEqual(true);
      expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
    });

    it('should lint valid document', async function() {
      const document = {
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
        channels: {}
      };

      const diagnostics = await lint(parser, document);
      if (!diagnostics) {
        return;
      }

      expect(diagnostics.length > 0).toEqual(true);
      expect(hasErrorDiagnostic(diagnostics)).toEqual(false);
      expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
    });
  });

  describe('validate()', function() {
    it('should validate invalid document', async function() {
      const document = JSON.stringify({
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
      }, undefined, 2);
      const { validated, diagnostics } = await validate(parser, document);

      expect(validated).toBeUndefined();
      expect(diagnostics.length > 0).toEqual(true);
    });

    it('should validate valid document', async function() {
      const document = JSON.stringify({
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
        channels: {}
      }, undefined, 2);
      const { validated, diagnostics } = await validate(parser, document);
      
      expect(validated).not.toBeUndefined();
      expect(diagnostics.length > 0).toEqual(true);
    });

    it('should validate valid document - do not allow warning severity', async function() {
      const document = JSON.stringify({
        asyncapi: '2.0.0',
        info: {
          title: 'Valid AsyncApi document',
          version: '1.0',
        },
        channels: {}
      }, undefined, 2);
      const { validated, diagnostics } = await validate(parser, document, { allowedSeverity: { warning: false } });
      
      expect(validated).toBeUndefined();
      expect(diagnostics.length > 0).toEqual(true);
    });
  });
});
