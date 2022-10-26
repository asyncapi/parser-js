import { ExternalDocumentation } from '../../../src/models/v3/external-documentation';

import { serializeInput, assertDescription, assertExtensions } from './utils';

import type { v3 } from '../../../src/spec-types';

describe('ExternalDocumentation model', function() {
  describe('.url()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.ExternalDocumentationObject>({ url: 'somewhere' });
      const d = new ExternalDocumentation(doc);
      expect(d.url()).toEqual(doc.url);
    });
  });

  describe('mixins', function() {
    assertDescription(ExternalDocumentation);
    assertExtensions(ExternalDocumentation);
  });
});
