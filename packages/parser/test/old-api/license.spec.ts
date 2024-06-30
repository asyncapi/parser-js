import { License } from '../../src/old-api/license';
import { assertExtensionsMixin } from './mixins';

describe('License', function() {
  const json = { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0', 'x-test': 'testing' };

  describe('name()', function() {
    it('should return a string', function() {
      const d = new License(json);
      expect(d.name()).toEqual(json.name);
    });
  });
  
  describe('url()', function() {
    it('should return a string', function() {
      const d = new License(json);
      expect(d.url()).toEqual(json.url);
    });
  });

  assertExtensionsMixin(License);
});