import { Channels } from '../../../src/models/v2/channels';
import { Channel } from '../../../src/models/v2/channel';

const channel = {
  publish: {},
};
const channelItem = new Channel(channel, { asyncapi: {} as any, pointer: '', id: 'channel', address: '' });
const channelItems = [
  new Channel({ publish: {operationId: 'test1'} }, { asyncapi: {} as any, pointer: '', id: 'channel1', address: '' }),
  new Channel({ publish: {operationId: 'test2'} }, { asyncapi: {} as any, pointer: '', id: 'channel2', address: '' }),
  new Channel({ subscribe: {operationId: 'test3'} }, { asyncapi: {} as any, pointer: '', id: 'channel3', address: '' }),
  new Channel({ subscribe: {operationId: 'test4'} }, { asyncapi: {} as any, pointer: '', id: 'channel4', address: '' }),
];

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
    });

    it('should return false if the Channel name is missing', function () {
      const servers = new Channels([channelItem]);
      expect(servers.has('anotherName')).toEqual(false);
    });
  });

  describe('.filterBySend()', function () {
    it('should return all channels with subscribe operation', function () {
      const operations = new Channels(channelItems);
      expect(operations.filterBySend()).toEqual([channelItems[2], channelItems[3]]);
    });

    it('should return empty if there are no channels with operations with subscribe action', function () {
      const operations = new Channels([channelItems[0], channelItems[1]]);
      expect(operations.filterBySend()).toEqual([]);
    });
  });

  describe('.filterByReceive()', function () {
    it('should return all channels with publish operation', function () {
      const operations = new Channels(channelItems);
      expect(operations.filterByReceive()).toEqual([channelItems[0], channelItems[1]]);
    });

    it('should return empty if there are no channels with operations with publish action', function () {
      const operations = new Channels([channelItems[2], channelItems[3]]);
      expect(operations.filterByReceive()).toEqual([]);
    });
  });
});