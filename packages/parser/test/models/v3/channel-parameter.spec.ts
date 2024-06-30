import { ChannelParameter } from '../../../src/models/v3/channel-parameter';
import { Schema } from '../../../src/models/v3/schema';

import { serializeInput, assertDescription, assertExtensions } from './utils';

import type { v3 } from '../../../src/spec-types';

describe('ChannelParameter model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = serializeInput<v3.ParameterObject>({});
      const d = new ChannelParameter(doc, { asyncapi: {} as any, pointer: '', id: 'parameter' });
      expect(d.id()).toEqual('parameter');
    });
  });

  describe('.hasLocation()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v3.ParameterObject>({ location: '...' });
      const d = new ChannelParameter(doc);
      expect(d.hasLocation()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v3.ParameterObject>({});
      const d = new ChannelParameter(doc);
      expect(d.hasLocation()).toEqual(false);
    });
  });

  describe('.location()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v3.ParameterObject>({ location: '...' });
      const d = new ChannelParameter(doc);
      expect(d.location()).toEqual(doc.location);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v3.ParameterObject>({});
      const d = new ChannelParameter(doc);
      expect(d.location()).toBeUndefined();
    });
  });

  describe('.hasSchema()', function() {
    it('should return true if enum are sat', function() {
      const doc = serializeInput<v3.ParameterObject>({ enum: ['test'] });
      const d = new ChannelParameter(doc);
      expect(d.hasSchema()).toEqual(true);
    });
    it('should return true if default are sat', function() {
      const doc = serializeInput<v3.ParameterObject>({ default: 'test' });
      const d = new ChannelParameter(doc);
      expect(d.hasSchema()).toEqual(true);
    });
    
    it('should return true if examples are sat', function() {
      const doc = serializeInput<v3.ParameterObject>({ examples: ['test'] });
      const d = new ChannelParameter(doc);
      expect(d.hasSchema()).toEqual(true);
    });

    it('should return true when there is no value', function() {
      const doc = serializeInput<v3.ParameterObject>({});
      const d = new ChannelParameter(doc);
      expect(d.hasSchema()).toEqual(true);
    });
  });

  describe('.schema()', function() {
    it('should be able to access enum values', function() {
      const doc = serializeInput<v3.ParameterObject>({ enum: ['test'] });
      const d = new ChannelParameter(doc);
      expect(d.schema()).toBeInstanceOf(Schema);
      expect(d.schema()?.enum()).toEqual(['test']);
    });
    it('should be able to access examples values', function() {
      const doc = serializeInput<v3.ParameterObject>({ examples: ['test'] });
      const d = new ChannelParameter(doc);
      expect(d.schema()).toBeInstanceOf(Schema);
      expect(d.schema()?.examples()).toEqual(['test']);
    });
    it('should be able to access default value', function() {
      const doc = serializeInput<v3.ParameterObject>({ default: 'test' });
      const d = new ChannelParameter(doc);
      expect(d.schema()).toBeInstanceOf(Schema);
      expect(d.schema()?.default()).toEqual('test');
    });
    
    it('should be able to access description value', function() {
      const doc = serializeInput<v3.ParameterObject>({ description: 'test' });
      const d = new ChannelParameter(doc);
      expect(d.schema()).toBeInstanceOf(Schema);
      expect(d.schema()?.description()).toEqual('test');
    });
    it('should return empty schema with type string when there is no value', function() {
      const doc = serializeInput<v3.ParameterObject>({});
      const d = new ChannelParameter(doc);
      expect(d.schema()).toBeInstanceOf(Schema);
      expect(d.schema()?.type()).toEqual('string');
    });
  });

  describe('mixins', function() {
    assertDescription(ChannelParameter);
    assertExtensions(ChannelParameter);
  });
});
