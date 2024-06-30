import { Channel } from '../../src/old-api/channel';
import { ChannelParameter } from '../../src/old-api/channel-parameter';
import { Operation } from '../../src/old-api/operation';
import { assertDescriptionMixin, assertExtensionsMixin, assertBindingsMixin } from './mixins';

describe('Channel', function() {
  const json: any = { description: 'test', parameters: { param1: { description: 'param1', location: '$message.headers#/x-param1', schema: { type: 'string' } } }, bindings: { amqp: 'test' }, 'x-test': 'testing' };
  const jsonWithServers = { description: 'channel with servers', servers: ['server1', 'server2'] };
  const jsonWithoutServers = { description: 'channel without servers' };

  describe('hasParameters()', function() {
    it('should return a boolean indicating if the AsyncAPI document has channel parameters', function() {
      const doc = { parameters: { test1param: { description: 'test1param' } } };
      const docNoChannelParams = { description: 'test' };
      const d = new Channel(doc);
      const d2 = new Channel(docNoChannelParams);
      expect(d.hasParameters()).toEqual(true);
      expect(d2.hasParameters()).toEqual(false);
    });
  });

  describe('parameters()', function() {
    it('should return a map of ChannelParameter objects', function() {
      const d = new Channel(json);
      expect(typeof d.parameters()).toEqual('object');
      expect(d.parameters().param1).toBeInstanceOf(ChannelParameter);
      expect(d.parameters().param1.json()).toEqual(json.parameters.param1);
    });
  });

  describe('parameter()', function() {
    it('should return a specific ChannelParameter object', function() {
      const d = new Channel(json);
      expect(d.parameter('param1')).toBeInstanceOf(ChannelParameter);
      expect(d.parameter('param1')?.json()).toEqual(json.parameters.param1);
    });
  });

  describe('hasServers()', function() {
    it('should return a boolean indicating if the channel has a servers list', function() {
      const d1 = new Channel(jsonWithServers);
      const d2 = new Channel(jsonWithoutServers);
      expect(d1.hasServers()).toEqual(true);
      expect(d2.hasServers()).toEqual(false);
    });
  });

  describe('servers()', function() {
    it('should return an array of String server names if the channel has a servers list', function() {
      const d = new Channel(jsonWithServers);
      expect(Array.isArray(d.servers())).toEqual(true);
      d.servers().forEach((s, i) => {
        expect(typeof s === 'string').toEqual(true);
        expect(s).toEqual(jsonWithServers.servers[i]);
      });
    });

    it('should return an empty array if the channel doesn\'t have servers', function() {
      const d = new Channel(jsonWithoutServers);
      expect(Array.isArray(d.servers())).toEqual(true);
      expect(d.servers().length).toEqual(0);
    });
  });

  describe('server()', function() {
    it('should return null if the channel doesn\'t have servers', function() {
      const d = new Channel(jsonWithoutServers);
      expect(d.server(undefined as any)).toEqual(null);
    });

    it('should return a specific server String name', function() {
      const d = new Channel(jsonWithServers);
      jsonWithServers.servers.forEach((s, i) => {
        expect(d.server(i)).toEqual(s);
      });
    });

    it('should return null when index is out of bounds', function() {
      const d1 = new Channel(jsonWithServers);
      const d2 = new Channel(jsonWithoutServers);
      expect(d1.server(100)).toEqual(null);
      expect(d2.server(1)).toEqual(null);
    });

    it('should return null if index is not a number', function() {
      const d = new Channel(jsonWithServers);
      expect(d.server('0')).toEqual(null);
    });
  });

  describe('publish()', function() {
    it('should return a publish Operation object', function() {
      const jsWithPub = { publish: { description: 'pub' } };
      const d = new Channel(jsWithPub);
      expect(d.publish()).toBeInstanceOf(Operation);
      expect(d.publish()?.kind()).toEqual('publish');
      expect(d.publish()?.json()).toEqual(jsWithPub.publish);
    });
  });

  describe('subscribe()', function() {
    it('should return a subscribe Operation object', function() {
      const jsWithSub = { subscribe: { description: 'sub' } };
      const d = new Channel(jsWithSub);
      expect(d.subscribe()).toBeInstanceOf(Operation);
      expect(d.subscribe()?.kind()).toEqual('subscribe');
      expect(d.subscribe()?.json()).toEqual(jsWithSub.subscribe);
    });
  });

  describe('hasPublish()', function() {
    it('should return true if the channel contains the publish operation', function() {
      const d = new Channel({ publish: { description: 'pub' } });
      expect(d.hasPublish()).toEqual(true);
      const d2 = new Channel({ subscribe: { description: 'sub' } });
      expect(d2.hasPublish()).toEqual(false);
    });
  });

  describe('hasSubscribe()', function() {
    it('should return true if the channel contains the publish operation', function() {
      const d = new Channel({ publish: { description: 'pub' } });
      expect(d.hasSubscribe()).toEqual(false);
      const d2 = new Channel({ subscribe: { description: 'sub' } });
      expect(d2.hasSubscribe()).toEqual(true);
    });
  });

  assertDescriptionMixin(Channel);
  assertExtensionsMixin(Channel);
  assertBindingsMixin(Channel);
});