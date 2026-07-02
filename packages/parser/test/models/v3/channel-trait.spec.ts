import { ChannelTrait } from '../../../src/models/v3/channel-trait';
import { ChannelParameters } from '../../../src/models/v3/channel-parameters';
import { ChannelParameter } from '../../../src/models/v3/channel-parameter';
import { Servers } from '../../../src/models/v3/servers';
import { Server } from '../../../src/models/v3/server';

import { assertCoreModel, serializeInput } from './utils';

import type { v3 } from '../../../src/spec-types';

describe('ChannelTrait model', function() {
  describe('.id()', function() {
    it('should return id of model', function() {
      const d = new ChannelTrait({}, { asyncapi: {} as any, pointer: '', id: 'trait' });
      expect(d.id()).toEqual('trait');
    });
  });

  describe('.servers()', function() {
    it('should return the servers selected by the trait', function() {
      const selectedServer = {};
      const doc = serializeInput<v3.ChannelTraitObject>({ servers: [selectedServer] });
      const d = new ChannelTrait(doc, {
        asyncapi: {
          parsed: {
            servers: {
              first: {},
              selected: selectedServer
            }
          }
        } as any,
        pointer: '',
        id: 'trait'
      });

      expect(d.servers()).toBeInstanceOf(Servers);
      expect(d.servers().all()).toHaveLength(1);
      expect(d.servers().all()[0]).toBeInstanceOf(Server);
      expect(d.servers().all()[0].id()).toEqual('selected');
    });
  });

  describe('.parameters()', function() {
    it('should return the parameters defined by the trait', function() {
      const doc = serializeInput<v3.ChannelTraitObject>({
        parameters: {
          parameter: {}
        }
      });
      const d = new ChannelTrait(doc);

      expect(d.parameters()).toBeInstanceOf(ChannelParameters);
      expect(d.parameters().all()).toHaveLength(1);
      expect(d.parameters().all()[0]).toBeInstanceOf(ChannelParameter);
      expect(d.parameters().all()[0].id()).toEqual('parameter');
    });
  });

  describe('mixins', function() {
    assertCoreModel(ChannelTrait);
  });
});
