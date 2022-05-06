import { Operation } from '../../../src/models/v2/operation';
import { OperationTraits } from '../../../src/models/v2/operation-traits';
import { OperationTrait } from '../../../src/models/v2/operation-trait';
import { Messages } from '../../../src/models/v2/messages';
import { Message } from '../../../src/models/v2/message';

import { 
  assertBindingsMixinInheritance,
  assertDescriptionMixinInheritance,
  assertExtensionsMixinInheritance,
  assertExternalDocumentationMixinInheritance,
  assertTagsMixinInheritance,
} from './mixins/inheritance';

describe('Operation model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = {};
      const d = new Operation('message', doc);
      expect(d.id()).toEqual('message');
    });

    it('should reuse operationId', function() {
      const doc = { operationId: '...' };
      const d = new Operation('message', doc);
      expect(d.id()).toEqual(doc.operationId);
    });
  });

  describe('.messages()', function() {
    it('should return collection of messages - single message', function() {
      const doc = { message: { messageId: '...' } };
      const d = new Operation('message', doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
    });

    it('should return collection of messages - oneOf messages', function() {
      const doc = { message: { oneOf: [ { messageId: '...' }, { messageId: '...' } ] } };
      const d = new Operation('message', doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(2);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new Operation('message', doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(0);
    });
  });

  describe('.traits()', function() {
    it('should return collection of traits', function() {
      const doc = { traits: [ { operationId: '...' } ] };
      const d = new Operation('message', doc);
      expect(d.traits()).toBeInstanceOf(OperationTraits);
      expect(d.traits().all()).toHaveLength(1);
      expect(d.traits().all()[0]).toBeInstanceOf(OperationTrait);
    });
    
    it('should return collection of traits when value is undefined', function() {
      const doc = {};
      const d = new Operation('message', doc);
      expect(d.traits()).toBeInstanceOf(OperationTraits);
      expect(d.traits().all()).toHaveLength(0);
    });
  });

  describe('mixins inheritance', function() {
    assertBindingsMixinInheritance(Operation);
    assertDescriptionMixinInheritance(Operation);
    assertExtensionsMixinInheritance(Operation);
    assertExternalDocumentationMixinInheritance(Operation);
    assertTagsMixinInheritance(Operation);
  });
});
