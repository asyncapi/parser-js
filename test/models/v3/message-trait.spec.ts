import { CorrelationId } from '../../../src/models/v3/correlation-id';
import { MessageExamples } from '../../../src/models/v3/message-examples';
import { MessageExample } from '../../../src/models/v3/message-example';
import { MessageTrait } from '../../../src/models/v3/message-trait';
import { Schema } from '../../../src/models/v3/schema';

import { assertCoreModel } from './utils';

describe('MessageTrait model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = {};
      const d = new MessageTrait(doc, { asyncapi: {} as any, pointer: '', id: 'trait' });
      expect(d.id()).toEqual('trait');
    });

    it('should reuse messageId', function() {
      const doc = { messageId: '...' };
      const d = new MessageTrait(doc);
      expect(d.id()).toEqual(doc.messageId);
    });
  });

  describe('.schemaFormat()', function() {
    it('should return always undefined', function() {
      const doc = { schemaFormat: 'customSchemaFormat' };
      const d = new MessageTrait(doc, { asyncapi: {} as any, pointer: '', id: 'message' });
      expect(d.schemaFormat()).toBeUndefined();
    });
  });

  describe('.hasSchemaFormat()', function() {
    it('should return always false', function() {
      const doc = { schemaFormat: 'customSchemaFormat' };
      const d = new MessageTrait(doc, { asyncapi: {} as any, pointer: '', id: 'message' });
      expect(d.hasSchemaFormat()).toBeFalsy();
    });
  });

  describe('.hasMessageId()', function() {
    it('should return true when there is a value', function() {
      const doc = { messageId: '...' };
      const d = new MessageTrait(doc);
      expect(d.hasMessageId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.hasMessageId()).toEqual(false);
    });
  });

  describe('.messageId()', function() {
    it('should return the value', function() {
      const doc = { messageId: '...' };
      const d = new MessageTrait(doc);
      expect(d.messageId()).toEqual(doc.messageId);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.messageId()).toBeUndefined();
    });
  });

  describe('.hasCorrelationId()', function() {
    it('should return true when there is a value', function() {
      const doc = { correlationId: { location: '...' } };
      const d = new MessageTrait(doc);
      expect(d.hasCorrelationId()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.hasCorrelationId()).toEqual(false);
    });
  });

  describe('.correlationId()', function() {
    it('should return the value', function() {
      const doc = { correlationId: { location: '...' } };
      const d = new MessageTrait(doc);
      expect(d.correlationId()).toBeInstanceOf(CorrelationId);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.correlationId()).toBeUndefined();
    });
  });
  
  describe('.hasContentType()', function() {
    it('should return true when there is a value', function() {
      const doc = { contentType: '...' };
      const d = new MessageTrait(doc);
      expect(d.hasContentType()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.hasContentType()).toEqual(false);
    });
  });

  describe('.contentType()', function() {
    it('should return the value', function() {
      const doc = { contentType: '...' };
      const d = new MessageTrait(doc);
      expect(d.contentType()).toEqual(doc.contentType);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.contentType()).toBeUndefined();
    });

    it('should reuse defaultContentType value', function() {
      const doc = {};
      const d = new MessageTrait(doc, { asyncapi: { parsed: { defaultContentType: '...' } } } as any);
      expect(d.contentType()).toEqual('...');
    });
  });

  describe('.hasHeaders()', function() {
    it('should return true when there is a value', function() {
      const doc = { headers: {} };
      const d = new MessageTrait(doc);
      expect(d.hasHeaders()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.hasHeaders()).toEqual(false);
    });
  });

  describe('.headers()', function() {
    it('should return the value', function() {
      const doc = { headers: {} };
      const d = new MessageTrait(doc);
      expect(d.headers()).toBeInstanceOf(Schema);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.headers()).toBeUndefined();
    });
  });

  describe('.hasName()', function() {
    it('should return true when there is a value', function() {
      const doc = { name: '...' };
      const d = new MessageTrait(doc);
      expect(d.hasName()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.hasName()).toEqual(false);
    });
  });

  describe('.name()', function() {
    it('should return the value', function() {
      const doc = { name: '...' };
      const d = new MessageTrait(doc);
      expect(d.name()).toEqual(doc.name);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.name()).toBeUndefined();
    });
  });

  describe('.examples()', function() {
    it('should return collection of examples', function() {
      const doc = { examples: [{ name: '...' }] };
      const d = new MessageTrait(doc);
      expect(d.examples()).toBeInstanceOf(MessageExamples);
      expect(d.examples().all()).toHaveLength(1);
      expect(d.examples().all()[0]).toBeInstanceOf(MessageExample);
    });
    
    it('should return collection of examples when value is undefined', function() {
      const doc = {};
      const d = new MessageTrait(doc);
      expect(d.examples()).toBeInstanceOf(MessageExamples);
      expect(d.examples().all()).toHaveLength(0);
    });
  });

  describe('mixins', function() {
    assertCoreModel(MessageTrait);
  });
});
