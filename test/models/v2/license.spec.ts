import { License } from '../../../src/models/v2/license';

import { assertExtensions } from './assert-mixins';

describe('License model', function() {
  describe('.name()', function() {
    it('should return the value', function() {
      const doc = { name: "Apache 2.0" };
      const d = new License(doc);
      expect(d.name()).toEqual(doc.name);
    });
  });

  describe('.hasUrl()', function() {
    it('should return true when there is a value', function() {
      const doc = { url: "https://www.apache.org/licenses/LICENSE-2.0.html" };
      const d = new License(doc);
      expect(d.hasUrl()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new License(doc);
      expect(d.hasUrl()).toEqual(false);
    });
  });

  describe('.url()', function() {
    it('should return the value', function() {
      const doc = { url: "https://www.apache.org/licenses/LICENSE-2.0.html" };
      const d = new License(doc);
      expect(d.url()).toEqual(doc.url);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new License(doc);
      expect(d.url()).toBeUndefined();
    });
  });

  describe('mixins', function() {
    assertExtensions(License);
  });
});
