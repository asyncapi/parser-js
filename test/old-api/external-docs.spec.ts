import { ExternalDocs } from '../../src/old-api/external-docs';
import { assertDescriptionMixin, assertExtensionsMixin } from './mixins';

describe('ExternalDocs', function() {
  const json = { url: 'somewhere' };

  describe('url()', function() {
    it('should return a string', function() {
      const d = new ExternalDocs(json);
      expect(d.url()).toEqual(json.url);
    });
  });

  assertDescriptionMixin(ExternalDocs);
  assertExtensionsMixin(ExternalDocs);
});