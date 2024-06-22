import { MessageExample } from '../../../src/models/v3/message-example';

import { assertExtensions } from './utils';

describe('MessageExample model', function() {
  describe('.hasName()', function() {
    it('should return true when there is a value', function() {
      const doc = { name: '...' };
      const d = new MessageExample(doc);
      expect(d.hasName()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageExample(doc);
      expect(d.hasName()).toEqual(false);
    });
  });

  describe('.name()', function() {
    it('should return the value', function() {
      const doc = { name: '...' };
      const d = new MessageExample(doc);
      expect(d.name()).toEqual(doc.name);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageExample(doc);
      expect(d.name()).toBeUndefined();
    });
  });

  describe('.hasSummary()', function() {
    it('should return true when there is a value', function() {
      const doc = { summary: '...' };
      const d = new MessageExample(doc);
      expect(d.hasSummary()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageExample(doc);
      expect(d.hasSummary()).toEqual(false);
    });
  });

  describe('.summary()', function() {
    it('should return the value', function() {
      const doc = { summary: '...' };
      const d = new MessageExample(doc);
      expect(d.summary()).toEqual(doc.summary);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageExample(doc);
      expect(d.summary()).toBeUndefined();
    });
  });

  describe('.hasHeaders()', function() {
    it('should return true when there is a value', function() {
      const doc = { headers: {} };
      const d = new MessageExample(doc);
      expect(d.hasHeaders()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageExample(doc);
      expect(d.hasSummary()).toEqual(false);
    });
  });

  describe('.headers()', function() {
    it('should return the value', function() {
      const doc = { headers: {} };
      const d = new MessageExample(doc);
      expect(d.headers()).toEqual(doc.headers);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageExample(doc);
      expect(d.headers()).toBeUndefined();
    });
  });

  describe('.hasPayload()', function() {
    it('should return true when there is a value', function() {
      const doc = { payload: {} };
      const d = new MessageExample(doc);
      expect(d.hasPayload()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageExample(doc);
      expect(d.hasPayload()).toEqual(false);
    });
  });

  describe('.payload()', function() {
    it('should return the value', function() {
      const doc = { payload: {} };
      const d = new MessageExample(doc);
      expect(d.payload()).toEqual(doc.payload);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageExample(doc);
      expect(d.payload()).toBeUndefined();
    });
  });

  describe('mixins', function() {
    assertExtensions(MessageExample);
  });
});
