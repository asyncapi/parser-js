const { expect } = require('chai');
const AsyncAPIDocument = require('../../lib/models/asyncapi');

describe('AsyncAPIDocument', () => {
  describe('#info()', function () {
    it('should return an info object', () => {
      const doc = { info: { title: 'Test', version: '1.2.3', license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' } }};
      const d = new AsyncAPIDocument(doc);
      expect(d.info().constructor.name).to.be.equal('Info');
      expect(d.info().json()).to.be.equal(doc.info);
    });
  });
  
  describe('#id()', function () {
    it('should return the id string', () => {
      const doc = { id: 'urn:test' };
      const d = new AsyncAPIDocument(doc);
      expect(d.id()).to.be.equal(doc.id);
    });
  });

  describe('#servers()', function () {
    it('should return a map of server objects', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.servers()).to.be.equal('object');
      expect(d.servers().test1.constructor.name).to.equal('Server');
      expect(d.servers().test1.json()).to.equal(doc.servers.test1);
      expect(d.servers().test2.constructor.name).to.equal('Server');
      expect(d.servers().test2.json()).to.equal(doc.servers.test2);
    });
  });
  
  describe('#server()', function () {
    it('should return a specific server object', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server('test1').constructor.name).to.equal('Server');
      expect(d.server('test1').json()).to.equal(doc.servers.test1);
    });
    
    it('should return null if a server name is not provided', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server()).to.equal(null);
    });
    
    it('should return null if a server name is not found', () => {
      const doc = { servers: { test1: { url: 'test1' }, test2: { url: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.server('not found')).to.equal(null);
    });
  });

  describe('#channels()', function () {
    it('should return a map of channel objects', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(typeof d.channels()).to.be.equal('object');
      expect(d.channels().test1.constructor.name).to.equal('Channel');
      expect(d.channels().test1.json()).to.equal(doc.channels.test1);
      expect(d.channels().test2.constructor.name).to.equal('Channel');
      expect(d.channels().test2.json()).to.equal(doc.channels.test2);
    });
  });

  describe('#channel()', function () {
    it('should return a specific channel object', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel('test1').constructor.name).to.equal('Channel');
      expect(d.channel('test1').json()).to.equal(doc.channels.test1);
    });

    it('should return null if a channel name is not provided', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel()).to.equal(null);
    });

    it('should return null if a channel name is not found', () => {
      const doc = { channels: { test1: { description: 'test1' }, test2: { description: 'test2' } } };
      const d = new AsyncAPIDocument(doc);
      expect(d.channel('not found')).to.equal(null);
    });
  });
});
