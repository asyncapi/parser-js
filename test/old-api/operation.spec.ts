import { Operation } from '../../src/old-api/operation';
import { SecurityRequirement } from '../../src/old-api/security-requirement';
import { assertDescriptionMixin, assertExternalDocumentationMixin, assertExtensionsMixin, assertBindingsMixin, assertTagsMixin } from './mixins';

describe('Operation', function() {   
  const json: any = { summary: 't', description: 'test', traits: [{bindings: {kafka: {clientId: 'my-app-id'}}}], operationId: 'test', tags: [{name: 'tag1'}], externalDocs: { url: 'somewhere' }, bindings: { amqp: { test: true } }, message: { test: true }, 'x-test': 'testing', security: [{ oauth2: ['user:read'] }]};

  describe('summary()', function() {
    it('should return a string', function() {
      const d = new Operation(json);
      expect(d.summary()).toEqual(json.summary);
    });
  });

  describe('traits()', function() {
    it('should return a list of traits', function() {
      const d = new Operation(json);
      expect(d.traits()[0].json()).toEqual(json.traits[0]);
    });

    it('should return a list of traits from x-parser-original-traits', function() {
      const { traits, ...newJs } = json;
      newJs['x-parser-original-traits'] = traits;
      const d = new Operation(newJs);
      expect(d.traits()[0].json()).toEqual(newJs['x-parser-original-traits'][0]);
    });
  });

  describe('hasTraits()', function() {
    it('should return true', function() {
      const d = new Operation(json);
      expect(d.hasTraits()).toEqual(true);
    });

    it('should return true if in x-parser-original-traits', function() {
      const { traits, ...newJs } = json;
      newJs['x-parser-original-traits'] = traits;
      const d = new Operation(newJs);
      expect(d.hasTraits()).toEqual(true);
    });

    it('should return false', function() {
      const { traits, ...newJs } = json;
      const d = new Operation(newJs);
      expect(d.hasTraits()).toEqual(false);
    });
  });
  
  describe('id()', function() {
    it('should return a string', function() {
      const d = new Operation(json);
      expect(d.id()).toEqual(json.operationId);
    });
  });
  
  describe('messages()', function() {
    it('should return an array of Message objects', function() {
      const d = new Operation(json);
      expect(Array.isArray(d.messages())).toEqual(true);
      d.messages().forEach(m => {
        expect(m.constructor.name).toEqual('Message');
        expect(m.json()).toEqual(json.message);
      });
    });
    
    it('should return an array of Message objects when using oneOf', function() {
      const doc = { message: { oneOf: [{test: true }, {test: false}] } };
      const d = new Operation(doc);
      expect(Array.isArray(d.messages())).toEqual(true);
      d.messages().forEach((m, i) => {
        expect(m.constructor.name).toEqual('Message');
        expect(m.json()).toEqual(doc.message.oneOf[i]);
      });
    });
  });
  
  describe('message()', function() {
    it('should return null if channel doesn\'t have a message', function() {
      const doc = { };
      const d = new Operation(doc);
      expect(d.message()).toEqual(null);
    });
    
    it('should return a specific Message object', function() {
      const doc = { message: { oneOf: [{ test: true }, { test: false }] } };
      const d = new Operation(doc);
      expect(d.message(0)?.json()).toEqual(doc.message.oneOf[0]);
      expect(d.message(1)?.json()).toEqual(doc.message.oneOf[1]);
    });

    it('should return a Message object if no index is provided and message is oneOf from one element', function() {
      const doc = { message: { oneOf: [{ test: true }] } };
      const d = new Operation(doc);
      expect(d.message()?.json()).toEqual(doc.message.oneOf[0]);
    });
    
    it('should return null when index is out of bounds', function() {
      const doc = { message: { oneOf: [{ test: true }, { test: false }] } };
      const d = new Operation(doc);
      expect(d.message(100)).toEqual(null);
    });

    it('should return null if index is not a number', function() {
      const doc = { message: { oneOf: [{ test: true }, { test: false }] } };
      const d = new Operation(doc);
      expect(d.message('0')).toEqual(null);
    });

    it('should return message object if no index is provided and message is not oneOf', function() {
      const doc = { message: { test: true } };
      const d = new Operation(doc);
      expect(d.message()?.json()).toEqual(doc.message);
    });
  });

  describe('security()', function() {
    it('should return an array of security requirements objects', function() {
      const d = new Operation(json);
      expect(Array.isArray(d.security())).toEqual(true);
      expect(d.security()).toHaveLength(1);
      d.security()?.forEach((s, i) => {
        expect(s).toBeInstanceOf(SecurityRequirement);
        expect(s.json()).toEqual(json.security[i]);
      });
    });
  });

  assertDescriptionMixin(Operation);
  assertExternalDocumentationMixin(Operation);
  assertBindingsMixin(Operation);
  assertTagsMixin(Operation);
  assertExtensionsMixin(Operation);
});