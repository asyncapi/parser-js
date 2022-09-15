import path from 'path';
import { Parser } from '../src/parser';
import { fromURL, fromFile } from '../src/from';
import { hasErrorDiagnostic, hasWarningDiagnostic } from '../src/utils';

describe('fromURL() & fromFile()', function() {
  const parser = new Parser();

  describe('fromURL()', function() {
    it('should operate on existing HTTP source', async function() {
      const { document, diagnostics } = await fromURL(parser, 'https://raw.githubusercontent.com/asyncapi/spec/master/examples/simple.yml').parse();
      expect(document).not.toBeUndefined();
      expect(diagnostics.length > 0).toEqual(true);
      expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
    });

    it('should throw error on nonexisting HTTP source', async function() {
      const { document, diagnostics } = await fromURL(parser, 'https://raw.githubusercontent.com/asyncapi/spec/master/examples/non-existing-spec.yml').parse();
      expect(document).toBeUndefined();
      expect(diagnostics.length > 0).toEqual(true);
      expect(hasErrorDiagnostic(diagnostics)).toEqual(true);
    });
  });

  describe('fromFile()', function() {
    it('should operate on existing file source', async function() {
      const { document, diagnostics } = await fromFile(parser, path.resolve(__dirname, './mocks/simple.yaml')).parse();
      expect(document).not.toBeUndefined();
      expect(diagnostics.length > 0).toEqual(true);
      expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
    });

    it('should throw error on nonexisting file source', async function() {
      expect(() => fromFile(parser, path.resolve(__dirname, './mocks/non-existing-spec.yaml')).parse()).rejects.toThrow();
    });
  });
});
