import { ChannelParameters } from '../../../src/models/v2/channel-parameters';
import { ChannelParameter } from '../../../src/models/v2/channel-parameter';

const channelParameter = {
  location: '...',
};
const channelParameterItem = new ChannelParameter(channelParameter, { asyncapi: {} as any, pointer: '', id: 'parameter' });

describe('ChannelParameters model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new ChannelParameters([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new ChannelParameters([channelParameterItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Channel Parameter if it is present', function () {
      const servers = new ChannelParameters([channelParameterItem]);
      expect(servers.get('parameter')).toBeTruthy();
    });

    it('should return undefined if specific Channel Parameter is missing', function () {
      const servers = new ChannelParameters([]);
      expect(servers.get('parameter')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said name is available', function () {
      const servers = new ChannelParameters([channelParameterItem]);
      expect(servers.has('parameter')).toEqual(true);
    })

    it('should return false if the Channel Parameter name is missing', function () {
      const servers = new ChannelParameters([channelParameterItem]);
      expect(servers.has('anotherName')).toEqual(false);
    })
  })
})