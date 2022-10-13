import { Servers } from '../../../src/models/servers';
import { Server } from '../../../src/models/v2/server';

const doc = {
  development: {
    protocol: 'mqtt',
    protocolVersion: '1.0.0',
    url: 'development.gigantic-server.com'
  },
  development2: {
    protocol: 'mqtt',
    protocolVersion: '1.0.0',
    url: 'development2.gigantic-server.com'
  },
  production: {
    protocol: 'mqtt',
    protocolVersion: '1.0.0',
    url: 'production.gigantic-server.com'
  },
  production2: {
    protocol: 'mqtt',
    protocolVersion: '1.0.0',
    url: 'production2.gigantic-server.com'
  }
};

const docItem = new Server(doc.development, { asyncapi: {} as any, pointer: '', id: 'development' });
const serverItems = [
  new Server(doc.development, { asyncapi: { parsed: { channels: { test1: { publish: { operationId: 'test1' } } } } } as any, pointer: '', id: 'development' }),
  new Server(doc.development2, { asyncapi: { parsed: { channels: { test2: { publish: { operationId: 'test2' } } } } } as any, pointer: '', id: 'development2' }),
  new Server(doc.production, { asyncapi: { parsed: { channels: { test3: { subscribe: { operationId: 'test3' } } } } } as any, pointer: '', id: 'production' }),
  new Server(doc.production2, { asyncapi: { parsed: { channels: { test4: { subscribe: { operationId: 'test4' } } } } } as any, pointer: '', id: 'production2' }),
];

describe('Servers model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new Servers([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new Servers([docItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific Server Object if it is present', function () {
      const servers = new Servers([docItem]);
      expect(servers.get('development')).toBeTruthy();
    });

    it('should return undefined if a server is said Id is missing ', function () {
      const servers = new Servers([]);
      expect(servers.get('development')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said name is available', function () {
      const servers = new Servers([docItem]);
      expect(servers.has('development')).toEqual(true);
    });

    it('should return false if the server name is missing', function () {
      const servers = new Servers([docItem]);
      expect(servers.has('production')).toEqual(false);
    });
  });

  describe('.filterBySend()', function () {
    it('should return all servers with channels with subscribe operation', function () {
      const servers = new Servers(serverItems);
      expect(servers.filterBySend()).toEqual([serverItems[2], serverItems[3]]);
    });

    it('should return empty if there are no servers with channels with operations with subscribe action', function () {
      const servers = new Servers([serverItems[0], serverItems[1]]);
      expect(servers.filterBySend()).toEqual([]);
    });
  });

  describe('.filterByReceive()', function () {
    it('should return all servers with channels with publish operation', function () {
      const servers = new Servers(serverItems);
      expect(servers.filterByReceive()).toEqual([serverItems[0], serverItems[1]]);
    });

    it('should return empty if there are no servers with channels with operations with publish action', function () {
      const servers = new Servers([serverItems[2], serverItems[3]]);
      expect(servers.filterByReceive()).toEqual([]);
    });
  });
});