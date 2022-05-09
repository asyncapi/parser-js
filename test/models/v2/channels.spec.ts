import { Channels } from '../../../src/models/v2/channels';
import { Channel } from '../../../src/models/v2/channel';

const channel = {
  publish: {},
};
const channelItem = new Channel(channel, { asyncapi: {} as any, pointer: '', id: 'channel', address: '' });

describe('Channels model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new Channels([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new Channels([channelItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Channel if it is present', function () {
      const servers = new Channels([channelItem]);
      expect(servers.get('channel')).toBeTruthy();
    });

    it('should return undefined if specific Channel is missing', function () {
      const servers = new Channels([]);
      expect(servers.get('channel')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said name is available', function () {
      const servers = new Channels([channelItem]);
      expect(servers.has('channel')).toEqual(true);
    })

    it('should return false if the Channel name is missing', function () {
      const servers = new Channels([channelItem]);
      expect(servers.has('anotherName')).toEqual(false);
    })
  })
})