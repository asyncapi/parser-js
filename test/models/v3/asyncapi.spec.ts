import { AsyncAPIDocument } from '../../../src/models/v3/asyncapi';
import { Channels } from '../../../src/models/v3/channels';
import { Components } from '../../../src/models/v3/components';
import { Info } from '../../../src/models/v3/info';
import { Messages } from '../../../src/models/v3/messages';
import { Operations } from '../../../src/models/v3/operations';
import { SecuritySchemes } from '../../../src/models/v3/security-schemes';
import { Servers } from '../../../src/models/v3/servers';

import { serializeInput, assertExtensions } from './utils';

import type { v3 } from '../../../src/spec-types';

describe('AsyncAPIDocument model', function() {
  describe('.version()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ asyncapi: '2.0.0' });
      const d = new AsyncAPIDocument(doc);
      expect(d.version()).toEqual(doc.asyncapi);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.version()).toBeUndefined();
    });
  });

  describe('.hasDefaultContentType()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ defaultContentType: '...' });
      const d = new AsyncAPIDocument(doc);
      expect(d.hasDefaultContentType()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.hasDefaultContentType()).toEqual(false);
    });
  });

  describe('.defaultContentType()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ defaultContentType: '...' });
      const d = new AsyncAPIDocument(doc);
      expect(d.defaultContentType()).toEqual(doc.defaultContentType);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.defaultContentType()).toBeUndefined();
    });
  });

  describe('.info()', function() {
    it('should return an Info object', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ info: {} });
      const d = new AsyncAPIDocument(doc);
      expect(d.info()).toBeInstanceOf(Info);
    });
  });

  describe('.servers()', function() {
    it('should return a collection of servers', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ servers: { development: {} } });
      const d = new AsyncAPIDocument(doc);
      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers()).toHaveLength(1);
      expect(d.servers().all()[0].id()).toEqual('development');
    });

    it('should return a collection of servers even if servers are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.servers()).toBeInstanceOf(Servers);
    });
  });

  describe('.channels()', function() {
    it('should return a collection of channels', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup' }, userLogout: { address: 'user/logout' } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.channels()).toBeInstanceOf(Channels);
      expect(d.channels()).toHaveLength(2);
      expect(d.channels().all()[0].address()).toEqual('user/signup');
      expect(d.channels().all()[1].address()).toEqual('user/logout');
    });

    it('should return a collection of channels even if channels are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.channels()).toBeInstanceOf(Channels);
    });
  });

  describe('.operations()', function() {
    it('should return a collection of operations', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ operations: { userSignup: {}, userLogout: {} } });
      const d = new AsyncAPIDocument(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
      expect(d.operations()).toHaveLength(2);
    });

    it('should return a collection of operations even if operations are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.operations()).toBeInstanceOf(Operations);
    });
  });

  describe('.messages()', function() {
    it('should return a collection of messages', function() {
      const duplicatedMessage = {};
      const doc = serializeInput<v3.AsyncAPIObject>({ channels: { userSignup: { address: 'user/signup', messages: { someMessage1: {}, someMessage2: duplicatedMessage } }, userLogout: { address: 'user/logout', messages: { someMessage3: duplicatedMessage } } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages()).toHaveLength(2);
    });

    it('should return a collection of messages even if messages are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.messages()).toBeInstanceOf(Messages);
    });
  });

  describe('.schemas()', function() {
    it.todo('should return a collection of schemas');
  });

  describe('.securitySchemes()', function() {
    it('should return a collection of securitySchemes', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ components: { securitySchemes: { security1: { type: 'X509' }, security2: { type: 'apiKey' } } } });
      const d = new AsyncAPIDocument(doc);
      expect(d.securitySchemes()).toBeInstanceOf(SecuritySchemes);
      expect(d.securitySchemes()).toHaveLength(2);
    });

    it('should return a collection of securitySchemes even if securitySchemes are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.securitySchemes()).toBeInstanceOf(SecuritySchemes);
    });
  });

  describe('.components()', function() {
    it('should return a components model', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({ components: {} });
      const d = new AsyncAPIDocument(doc);
      expect(d.components()).toBeInstanceOf(Components);
    });

    it('should return a components model even if components are not defined', function() {
      const doc = serializeInput<v3.AsyncAPIObject>({});
      const d = new AsyncAPIDocument(doc);
      expect(d.components()).toBeInstanceOf(Components);
    });
  });

  describe('mixins', function() {
    assertExtensions(AsyncAPIDocument);
  });
});
