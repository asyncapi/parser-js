const { expect } = require('chai');
const js = { description: 'test', parameters: { param1: { description: 'param1', location: '$message.headers#/x-param1', schema: { type: 'string' } } }, bindings: { amqp: 'test' }, 'x-test': 'testing' };
const jsWithServers = { description: 'channel with servers', servers: ['server1', 'server2'] };
const jsWithoutServers = { description: 'channel without servers' };

const Channel = require('../../lib/models/channel');

const { assertMixinDescriptionInheritance } = require('../mixins/description_test');
const { assertMixinBindingsInheritance } = require('../mixins/bindings_test');
const { assertMixinSpecificationExtensionsInheritance } = require('../mixins/specification-extensions_test');
const { isString } = require('lodash');

describe('Channel', function () {
  describe('#hasParameters()', function () {
    it('should return a boolean indicating if the AsyncAPI document has channel parameters', function () {
      const doc = { parameters: { test1param: { description: 'test1param' } } };
      const docNoChannelParams = { description: 'test' };
      const d = new Channel(doc);
      const d2 = new Channel(docNoChannelParams);
      expect(d.hasParameters()).to.equal(true);
      expect(d2.hasParameters()).to.equal(false);
    });
  });

  describe('#parameters()', function () {
    it('should return a map of ChannelParameter objects', function () {
      const d = new Channel(js);
      expect(typeof d.parameters()).to.be.equal('object');
      expect(d.parameters().param1.constructor.name).to.equal('ChannelParameter');
      expect(d.parameters().param1.json()).to.equal(js.parameters.param1);
    });
  });

  describe('#parameter()', function () {
    it('should return a specific ChannelParameter object', function () {
      const d = new Channel(js);
      expect(d.parameter('param1').constructor.name).to.be.equal('ChannelParameter');
      expect(d.parameter('param1').json()).to.equal(js.parameters.param1);
    });
  });

  describe('#hasServers()', function () {
    it('should return a boolean indicating if the channel has a servers list', function () {
      const d1 = new Channel(jsWithServers);
      const d2 = new Channel(jsWithoutServers);
      expect(d1.hasServers()).to.equal(true);
      expect(d2.hasServers()).to.equal(false);
    });
  });

  describe('#servers()', function () {
    it('should return an array of String server names or an empty array', function () {
      const d1 = new Channel(jsWithServers);
      const d2 = new Channel(jsWithoutServers);
      expect(Array.isArray(d1.servers())).to.equal(true);
      expect(Array.isArray(d2.servers())).to.equal(true);
      d1.servers().forEach((s, i) => {
        expect(isString(s)).to.equal(true);
        expect(s).to.equal(jsWithServers.servers[i]);
      });
      expect(d2.servers().length).to.equal(0);
    });
  });

  describe('#server()', function () {
    it('should return null if the channel doesn\'t have servers', function () {
      const d = new Channel(jsWithoutServers);
      expect(d.server()).to.be.equal(null);
    });

    it('should return a specific server String name', function () {
      const d = new Channel(jsWithServers);
      jsWithServers.servers.forEach((s, i) => {
        expect(d.server(i)).to.equal(s);
      });
    });

    it('should return null when index is out of bounds', function () {
      const d1 = new Channel(jsWithServers);
      const d2 = new Channel(jsWithoutServers);
      expect(d1.server(100)).to.equal(null);
      expect(d2.server(1)).to.equal(null);
    });

    it('should return null if index is not a number', function () {
      const d = new Channel(jsWithServers);
      expect(d.server('0')).to.equal(null);
    });
  });

  describe('#publish()', function () {
    it('should return a PublishOperation object', function () {
      const jsWithPub = { publish: { description: 'pub' } };
      const d = new Channel(jsWithPub);
      expect(d.publish().constructor.name).to.be.equal('PublishOperation');
      expect(d.publish().json()).to.equal(jsWithPub.publish);
    });
  });

  describe('#subscribe()', function () {
    it('should return a SubscribeOperation object', function () {
      const jsWithSub = { subscribe: { description: 'sub' } };
      const d = new Channel(jsWithSub);
      expect(d.subscribe().constructor.name).to.be.equal('SubscribeOperation');
      expect(d.subscribe().json()).to.equal(jsWithSub.subscribe);
    });
  });

  describe('#hasPublish()', function () {
    it('should return true if the channel contains the publish operation', function () {
      const d = new Channel({ publish: { description: 'pub' } });
      expect(d.hasPublish()).to.be.equal(true);
      const d2 = new Channel({ subscribe: { description: 'sub' } });
      expect(d2.hasPublish()).to.be.equal(false);
    });
  });

  describe('#hasSubscribe()', function () {
    it('should return true if the channel contains the publish operation', function () {
      const d = new Channel({ publish: { description: 'pub' } });
      expect(d.hasSubscribe()).to.be.equal(false);
      const d2 = new Channel({ subscribe: { description: 'sub' } });
      expect(d2.hasSubscribe()).to.be.equal(true);
    });
  });

  describe('#mixins', function () {
    it('model should inherit from mixins', function () {
      assertMixinDescriptionInheritance(Channel);
      assertMixinBindingsInheritance(Channel);
      assertMixinSpecificationExtensionsInheritance(Channel);
    });
  });
});
