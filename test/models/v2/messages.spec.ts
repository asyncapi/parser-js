import { Messages } from '../../../src/models/v2/messages';
import { Message } from '../../../src/models/v2/message';

const message = {
  messageId: 'test',
};
const messageItem = new Message(message, { asyncapi: {} as any, pointer: '', id: 'test' });
const messageItems = [
  new Message({ messageId: "test1" }, { asyncapi: { parsed: { channels: { test1: { publish: { operationId: "test1", message: { messageId: "test1" } } } } } } as any, pointer: '', id: 'test1' }),
  new Message({ messageId: "test2" }, { asyncapi: { parsed: { channels: { test2: { publish: { operationId: "test2", message: { messageId: "test2" } } } } } } as any, pointer: '', id: 'test2' }),
  new Message({ messageId: "test3" }, { asyncapi: { parsed: { channels: { test3: { subscribe: { operationId: "test3", message: { messageId: "test3" } } } } } } as any, pointer: '', id: 'test3' }),
  new Message({ messageId: "test4" }, { asyncapi: { parsed: { channels: { test4: { subscribe: { operationId: "test4", message: { messageId: "test4" } } } } } } as any, pointer: '', id: 'test4' }),
];

describe('Messages model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const messages = new Messages([]);
      expect(messages.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const messages = new Messages([messageItem]);
      expect(messages.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Message if it is present', function () {
      const messages = new Messages([messageItem]);
      expect(messages.get('test')).toBeTruthy();
    });

    it('should return undefined if specific Message is missing', function () {
      const messages = new Messages([]);
      expect(messages.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const messages = new Messages([messageItem]);
      expect(messages.has('test')).toEqual(true);
    })

    it('should return false if the Message id is missing', function () {
      const messages = new Messages([messageItem]);
      expect(messages.has('anotherId')).toEqual(false);
    })
  })

  describe('.filterBySend()', function () {
    it('should return all messages in channels with subscribe operation', function () {
      const messages = new Messages(messageItems);
      expect(messages.filterBySend()).toEqual([messageItems[2], messageItems[3]]);
    })

    it('should return empty if there are no messages in channels with operations with subscribe action', function () {
      const messages = new Messages([messageItems[0], messageItems[1]]);
      expect(messages.filterBySend()).toEqual([]);
    })
  })

  describe('.filterByReceive()', function () {
    it('should return all messages in channels with publish operation', function () {
      const messages = new Messages(messageItems);
      expect(messages.filterByReceive()).toEqual([messageItems[0], messageItems[1]]);
    })

    it('should return empty if there are no messages in channels with operations with publish action', function () {
      const messages = new Messages([messageItems[2], messageItems[3]]);
      expect(messages.filterByReceive()).toEqual([]);
    })
  })
})