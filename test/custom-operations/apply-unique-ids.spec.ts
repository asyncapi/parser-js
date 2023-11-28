import { applyUniqueIds } from '../../src/custom-operations';

describe('applying unique ids', function() {
  it('should not do anything for v2 inputs', async function() {
    const input = {asyncapi: '2.0.0'};
    const output = {...input};
    applyUniqueIds(output);
    expect(input).toEqual(output);
  });
  describe('for v3', function() {
    it('should work with no channels input', async function() {
      const input = {asyncapi: '3.0.0'};
      const output = {...input};
      applyUniqueIds(output);
      expect(input).toEqual(output);
    });
    it('should set unique id when input has channels', async function() {
      const input = {asyncapi: '3.0.0', channels: {testChannel: {}}};
      const output = {...input, channels: {testChannel: {'x-parser-unique-object-id': 'testChannel'}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
    it('should set unique id when input has messages in channels', async function() {
      const input = {asyncapi: '3.0.0', channels: {testChannel: {messages: {testMessage: {}}}}};
      const output = {...input, channels: {testChannel: {'x-parser-unique-object-id': 'testChannel', messages: {testMessage: {'x-parser-unique-object-id': 'testMessage'}}}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
  });
});
