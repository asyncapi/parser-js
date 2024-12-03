import { Channel } from '../../../src/models/v3/channel';
import { OperationReply } from '../../../src/models/v3/operation-reply';
import { OperationReplyAddress } from '../../../src/models/v3/operation-reply-address';
import { Messages } from '../../../src/models/v3/messages';
import { Message } from '../../../src/models/v3/message';

import { assertExtensions } from './utils';

describe('OperationReply model', function() {
  describe('.id()', function() {
    it('should return id', function() {
      const d = new OperationReply({id: 'reply'}, { asyncapi: {} as any, pointer: '' });
      expect(d.id()).toEqual('reply');
    });
  });

  describe('.hasAddress()', function() {
    it('should return true if address is present', function() {
      const d = new OperationReply({ address: { location: 'location' } }, { asyncapi: {} as any, pointer: '' });
      expect(d.hasAddress()).toEqual(true);
    });

    it('should return false if address is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.hasAddress()).toEqual(false);
    });
  });

  describe('.address()', function() {
    it('should return OperationReplyAdress Model if address is present', function() {
      const d = new OperationReply({ address: { location: 'location' } }, { asyncapi: {} as any, pointer: '' });
      expect(d.address()).toBeInstanceOf(OperationReplyAddress);
    });

    it('should return undefined if address is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.address()).toBeUndefined();
    });
  });

  describe('.hasChannel()', function() {
    it('should return true if channel is present', function() {
      const d = new OperationReply({ channel: {} }, { asyncapi: {} as any, pointer: '' });
      expect(d.hasChannel()).toEqual(true);
    });

    it('should return false if channel is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.hasChannel()).toEqual(false);
    });
  });

  describe('.channel()', function() {
    it('should return Channel Model if address is present', function() {
      const d = new OperationReply({ channel: {} }, { asyncapi: {} as any, pointer: '' });
      expect(d.channel()).toBeInstanceOf(Channel);
    });

    it('should return undefined if address is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.channel()).toBeUndefined();
    });
  });
  
  describe('.messages()', function() {
    it('should return collection of messages - single message', function() {
      const d = new OperationReply({ messages: [{'x-parser-unique-object-id': 'testMessage'}] });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(1);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].id()).toEqual('testMessage');
    });

    it('should return collection of messages - more than one messages', function() {
      const d = new OperationReply({ messages: [{'x-parser-unique-object-id': 'testMessage1'}, {'x-parser-unique-object-id': 'testMessage2'}] });
      expect(d.messages()).toBeInstanceOf(Messages);
      expect(d.messages().all()).toHaveLength(2);
      expect(d.messages().all()[0]).toBeInstanceOf(Message);
      expect(d.messages().all()[0].id()).toEqual('testMessage1');
      expect(d.messages().all()[1]).toBeInstanceOf(Message);
      expect(d.messages().all()[1].id()).toEqual('testMessage2');
    });

    it('should return undefined if address is not present', function() {
      const d = new OperationReply({}, { asyncapi: {} as any, pointer: '' });
      expect(d.channel()).toBeUndefined();
    });
  });

  describe('mixins', function() {
    assertExtensions(OperationReply);
  });
});
