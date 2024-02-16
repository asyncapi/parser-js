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
    it('should set unique id when input has operations', async function() {
      const input = {asyncapi: '3.0.0', operations: {testOperation: {}}};
      const output = {...input, operations: {testOperation: {'x-parser-unique-object-id': 'testOperation'}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
    it('should set unique id when input has messages in channels', async function() {
      const input = {asyncapi: '3.0.0', channels: {testChannel: {messages: {testMessage: {}}}}};
      const output = {...input, channels: {testChannel: {'x-parser-unique-object-id': 'testChannel', messages: {testMessage: {'x-parser-unique-object-id': 'testMessage'}}}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
    it('should set unique id when input has channels under components', async function() {
      const input = {asyncapi: '3.0.0', components: {channels: {testChannel: {}}}};
      const output = {...input, components: {channels: {testChannel: {'x-parser-unique-object-id': 'testChannel'}}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
    it('should set unique id when input has operations under components', async function() {
      const input = {asyncapi: '3.0.0', components: {operations: {testOperation: {}}}};
      const output = {...input, components: {operations: {testOperation: {'x-parser-unique-object-id': 'testOperation'}}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
    it('should set unique id when input has messages in channels under components', async function() {
      const input = {asyncapi: '3.0.0', components: {channels: {testChannel: {messages: {testMessage: {}}}}}};
      const output = {...input, components: {channels: {testChannel: {'x-parser-unique-object-id': 'testChannel', messages: {testMessage: {'x-parser-unique-object-id': 'testMessage'}}}}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
    it('should set unique id when input has messages under components', async function() {
      const input = {asyncapi: '3.0.0', components: { messages: {testMessage: {}}}};
      const output = {...input, components: { messages: {testMessage: {'x-parser-unique-object-id': 'testMessage'}}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
    it('should not overwrite existing unique ids', async function() {
      const input = {asyncapi: '3.0.0', components: { messages: {testMessage: {'x-parser-unique-object-id': 'testMessage2'}}}};
      const output = {...input, components: { messages: {testMessage: {'x-parser-unique-object-id': 'testMessage2'}}}};
      applyUniqueIds(input);
      expect(input).toEqual(output);
    });
  });
});
