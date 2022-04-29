import { Message } from '../../../src/models/v2/message';
import { MessageTraits } from '../../../src/models/v2/message-traits';
import { MessageTrait } from '../../../src/models/v2/message-trait';
import { Schema } from '../../../src/models/v2/schema';

import { 
  assertBindingsMixinInheritance,
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
  assertExternalDocumentationMixinInheritance,
  assertTagsMixinInheritance,
} from './mixins/inheritance';

describe('Message model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = {};
      const d = new Message('trait', doc);
      expect(d.id()).toEqual('trait');
    });

    it('should reuse messageId', function() {
      const doc = { messageId: '...' };
      const d = new Message('trait', doc);
      expect(d.id()).toEqual(doc.messageId);
    });
  });

  describe('.hasPayload()', function() {
    it('should return true when there is a value', function() {
      const doc = { payload: {} };
      const d = new Message('trait', doc);
      expect(d.hasPayload()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new Message('trait', doc);
      expect(d.hasPayload()).toEqual(false);
    });
  });

  describe('.payload()', function() {
    it('should return the value', function() {
      const doc = { payload: {} };
      const d = new Message('trait', doc);
      expect(d.payload()).toBeInstanceOf(Schema);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Message('trait', doc);
      expect(d.payload()).toBeUndefined();
    });
  });

  describe('.traits()', function() {
    it('should return collection of traits', function() {
      const doc = { traits: [ { messageId: '...' } ] };
      const d = new Message('trait', doc);
      expect(d.traits()).toBeInstanceOf(MessageTraits);
      expect(d.traits().all()).toHaveLength(1);
      expect(d.traits().all()[0]).toBeInstanceOf(MessageTrait);
    });
    
    it('should return collection of traits when value is undefined', function() {
      const doc = {};
      const d = new Message('trait', doc);
      expect(d.traits()).toBeInstanceOf(MessageTraits);
      expect(d.traits().all()).toHaveLength(0);
    });
  });

  describe('mixins inheritance', function() {
    assertBindingsMixinInheritance(MessageTrait);
    assertDescriptionMixinInheritance(MessageTrait);
    assertExtensionsMixinInheritance(MessageTrait);
    assertExternalDocumentationMixinInheritance(MessageTrait);
    assertTagsMixinInheritance(MessageTrait);
  });
});
