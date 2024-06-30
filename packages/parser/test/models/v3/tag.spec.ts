import { Tag } from '../../../src/models/v3/tag';

import { assertDescription, assertExtensions, assertExternalDocumentation } from './utils';

describe('Tag model', function() {
  describe('.name()', function() {
    it('should return the value', function() {
      const doc = { name: 'LeChuck' };
      const d = new Tag(doc);
      expect(d.name()).toEqual(doc.name);
    });
  });

  describe('mixins inheritance', function() {
    assertDescription(Tag);
    assertExtensions(Tag);
    assertExternalDocumentation(Tag);
  });
});
