import { Message } from '../../src/old-api/message';
import { Schema } from '../../src/old-api/schema';
import { assertDescriptionMixin, assertExternalDocumentationMixin, assertExtensionsMixin, assertBindingsMixin, assertTagsMixin } from './mixins';

describe('Message', function() {
  const json: any = { schemaFormat: 'mySchema', traits: [{headers: {type: 'object',properties: {'my-app-header': {type: 'integer',minimum: 0,maximum: 100}}}}], headers: { properties: { test1: { type: 'string' }, test2: { type: 'number' } } }, payload: { test: true }, 'x-parser-original-payload': { testing: true }, correlationId: { test: true }, 'x-parser-original-schema-format': 'application/vnd.apache.avro;version=1.9.0', contentType: 'application/json', messageId: 'test', title: 'Test', summary: 'test', description: 'testing', externalDocs: { test: true }, tags: [{ name: 'tag1' }], bindings: { amqp: { test: true } }, examples: [{name: 'test', summary: 'test summary', payload: {test: true}}], 'x-test': 'testing' };

  describe('uid()', function() {
    it('should return a string with the messageId', function() {
      const d = new Message(json);
      expect(d.uid()).toEqual('test');
    });

    it('should return a string with the name when messageId is not available', function() {
      const msg = { ...json, ...{ name: 'test', messageId: undefined } };
      const d = new Message(msg);
      expect(d.uid()).toEqual('test');
    });
    
    it('should return a string with the x-parser-message-name extension when name and messageId are not available', function() {
      const msg = { ...json, ...{ 'x-parser-message-name': 'test', messageId: undefined } };
      const d = new Message(msg);
      expect(d.uid()).toEqual('test');
    });
  });
  
  describe('headers()', function() {
    it('should return a map of Schema objects', function() {
      const d = new Message(json);
      expect(d.headers()).toBeInstanceOf(Schema);
      expect(d.headers()?.json()).toEqual(json.headers);
    });
  });

  describe('header()', function() {
    it('should return a specific Schema object', function() {
      const d = new Message(json);
      expect(d.header('test1')).toBeInstanceOf(Schema);
      expect(d.header('test1')?.json()).toEqual(json.headers.properties.test1);
    });
  });

  describe('payload()', function() {
    it('should return payload as a Schema object', function() {
      const d = new Message(json);
      expect(d.payload()).toBeInstanceOf(Schema);
      expect(d.payload()?.json()).toEqual(json.payload);
    });
  });

  describe('originalPayload()', function() {
    it('should return the original payload', function() {
      const d = new Message(json);
      expect(d.originalPayload()).toEqual(json['x-parser-original-payload']);
    });
  });

  describe('correlationId()', function() {
    it('should return a CorrelationId object', function() {
      const d = new Message(json);
      expect(d.correlationId()?.json()).toEqual(json.correlationId);
    });
  });

  describe('schemaFormat()', function() {
    it('should return a string', function() {
      const d = new Message(json);
      expect(d.schemaFormat()).toEqual('mySchema');
    });
  });

  describe('originalSchemaFormat()', function() {
    it('should return a string', function() {
      const d = new Message(json);
      expect(d.originalSchemaFormat()).toEqual(json['x-parser-original-schema-format']);
    });
  });

  describe('contentType()', function() {
    it('should return a string', function() {
      const d = new Message(json);
      expect(d.contentType()).toEqual(json.contentType);
    });
  });

  describe('name()', function() {
    it('should return a string', function() {
      const d = new Message(json);
      expect(d.name()).toEqual(json.name);
    });
  });

  describe('title()', function() {
    it('should return a string', function() {
      const d = new Message(json);
      expect(d.title()).toEqual(json.title);
    });
  });

  describe('summary()', function() {
    it('should return a string', function() {
      const d = new Message(json);
      expect(d.summary()).toEqual(json.summary);
    });
  });

  describe('traits()', function() {
    it('should return a list of traits from traits', function() {
      const d = new Message(json);
      expect(d.traits()[0].json()).toEqual(json.traits[0]);
    });

    it('should return a list of traits from x-parser-original-traits', function() {
      const { traits, ...newJs } = json;
      newJs['x-parser-original-traits'] = traits;
      const d = new Message(newJs);
      expect(d.traits()[0].json()).toEqual(newJs['x-parser-original-traits'][0]);
    });
  });

  describe('hasTraits()', function() {
    it('should return true if in traits', function() {
      const d = new Message(json);
      expect(d.hasTraits()).toEqual(true);
    });

    it('should return true if in x-parser-original-traits', function() {
      const { traits, ...newJs } = json;
      newJs['x-parser-original-traits'] = traits;
      const d = new Message(newJs);
      expect(d.hasTraits()).toEqual(true);
    });

    it('should return false', function() {
      // eslint-disable-next-line no-unused-vars
      const { traits, ...newJs } = json;
      const d = new Message(newJs);
      expect(d.hasTraits()).toEqual(false);
    });
  });

  describe('examples()', function() {
    it('should return an array of examples', function() {
      const d = new Message(json);
      expect(Array.isArray(d.examples())).toEqual(true);
      expect(d.examples()).toEqual(json.examples);
    });
  });

  assertDescriptionMixin(Message);
  assertExternalDocumentationMixin(Message);
  assertBindingsMixin(Message);
  assertTagsMixin(Message);
  assertExtensionsMixin(Message);
});