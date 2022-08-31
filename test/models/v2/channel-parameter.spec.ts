import { ChannelParameter } from '../../../src/models/v2/channel-parameter';
import { Schema } from '../../../src/models/v2/schema';

import { serializeInput, assertDescription, assertExtensions } from './utils';

import type { v2 } from '../../../src/spec-types';

describe('ChannelParameter model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const doc = serializeInput<v2.ParameterObject>({});
      const d = new ChannelParameter(doc, { asyncapi: {} as any, pointer: '', id: 'parameter' });
      expect(d.id()).toEqual('parameter');
    });
  });

  describe('.hasLocation()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.ParameterObject>({ location: "..." });
      const d = new ChannelParameter(doc);
      expect(d.hasLocation()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.ParameterObject>({});
      const d = new ChannelParameter(doc);
      expect(d.hasLocation()).toEqual(false);
    });
  });

  describe('.location()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.ParameterObject>({ location: "..." });
      const d = new ChannelParameter(doc);
      expect(d.location()).toEqual(doc.location);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.ParameterObject>({});
      const d = new ChannelParameter(doc);
      expect(d.location()).toBeUndefined();
    });
  });

  describe('.hasSchema()', function() {
    it('should return true when there is a value', function() {
      const doc = serializeInput<v2.ParameterObject>({ schema: {} });
      const d = new ChannelParameter(doc);
      expect(d.hasSchema()).toEqual(true);
    });
    
    it('should return false when there is no value', function() {
      const doc = serializeInput<v2.ParameterObject>({});
      const d = new ChannelParameter(doc);
      expect(d.hasSchema()).toEqual(false);
    });
  });

  describe('.schema()', function() {
    it('should return the value', function() {
      const doc = serializeInput<v2.ParameterObject>({ schema: {} });
      const d = new ChannelParameter(doc);
      expect(d.schema()).toBeInstanceOf(Schema);
    });
    
    it('should return undefined when there is no value', function() {
      const doc = serializeInput<v2.ParameterObject>({});
      const d = new ChannelParameter(doc);
      expect(d.schema()).toBeUndefined();
    });
  });

  describe('mixins', function() {
    assertDescription(ChannelParameter);
    assertExtensions(ChannelParameter);
  });
});
