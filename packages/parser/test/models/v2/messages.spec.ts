import { Messages } from '../../../src/models/v2/messages';
import { Message } from '../../../src/models/v2/message';

const messages = {
  test1: { messageId: 'test1' },
  test2: { messageId: 'test2' },
  test3: { messageId: 'test3' },
  test4: { messageId: 'test4' },
};

const messageItems = [
  new Message(messages.test1, { asyncapi: { parsed: { channels: { test1: { publish: { operationId: 'test1', message: messages.test1 } } } } } as any, pointer: '', id: 'test1' }),
  new Message(messages.test2, { asyncapi: { parsed: { channels: { test2: { publish: { operationId: 'test2', message: messages.test2 } } } } } as any, pointer: '', id: 'test2' }),
  new Message(messages.test3, { asyncapi: { parsed: { channels: { test3: { subscribe: { operationId: 'test3', message: messages.test3 } } } } } as any, pointer: '', id: 'test3' }),
  new Message(messages.test4, { asyncapi: { parsed: { channels: { test4: { subscribe: { operationId: 'test4', message: messages.test4 } } } } } as any, pointer: '', id: 'test4' }),
];

describe('Messages model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const messages = new Messages([]);
      expect(messages.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const messages = new Messages([messageItems[0]]);
      expect(messages.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Message if it is present', function () {
      const messages = new Messages([messageItems[0]]);
      expect(messages.get('test1')).toBeTruthy();
    });

    it('should return undefined if specific Message is missing', function () {
      const messages = new Messages([]);
      expect(messages.get('test1')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const messages = new Messages([messageItems[0]]);
      expect(messages.has('test1')).toEqual(true);
    });

    it('should return false if the Message id is missing', function () {
      const messages = new Messages([messageItems[0]]);
      expect(messages.has('anotherId')).toEqual(false);
    });
  });

  describe('.filterBySend()', function () {
    it('should return all messages in channels with subscribe operation', function () {
      const messages = new Messages(messageItems);
      expect(messages.filterBySend()).toEqual([messageItems[2], messageItems[3]]);
    });

    it('should return empty if there are no messages in channels with operations with subscribe action', function () {
      const messages = new Messages([messageItems[0], messageItems[1]]);
      expect(messages.filterBySend()).toEqual([]);
    });
  });

  describe('.filterByReceive()', function () {
    it('should return all messages in channels with publish operation', function () {
      const messages = new Messages(messageItems);
      expect(messages.filterByReceive()).toEqual([messageItems[0], messageItems[1]]);
    });

    it('should return empty if there are no messages in channels with operations with publish action', function () {
      const messages = new Messages([messageItems[2], messageItems[3]]);
      expect(messages.filterByReceive()).toEqual([]);
    });
  });
});