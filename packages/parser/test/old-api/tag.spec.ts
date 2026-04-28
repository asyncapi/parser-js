import * as tag from '../../src/old-api/tag';
import { assertDescriptionMixin, assertExtensionsMixin, assertExternalDocumentationMixin } from './mixins';

describe('Tag', function() {
  const json = { name: 'test', description: 'Testing', externalDocs: { url: 'somewhere' }, 'x-test': 'testing' };

  describe('name()', function() {
    it('should return a string', function() {
      const d = new tag.Tag(json);
      expect(d.name()).toEqual(json.name);
    });
  });

  assertDescriptionMixin(tag.Tag);
  assertExtensionsMixin(tag.Tag);
  assertExternalDocumentationMixin(tag.Tag);
});