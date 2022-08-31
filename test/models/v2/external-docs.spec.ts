import { ExternalDocumentation } from '../../../src/models/v2/external-docs';

import { serializeInput, assertDescription, assertExtensions } from './utils';

import type { v2 } from '../../../src/spec-types';

describe('ExternalDocumentation model', function() {
  describe('.name()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.ExternalDocumentationObject>({ url: 'somewhere' });
      const d = new ExternalDocumentation(doc);
      expect(d.url()).toEqual(doc.url);
    });
  });

  describe('mixins', function() {
    assertDescription(ExternalDocumentation);
    assertExtensions(ExternalDocumentation);
  });
});
