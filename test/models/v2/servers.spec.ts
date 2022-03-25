import { Servers } from '../../../src/models/v2/servers';
import { Server } from '../../../src/models/v2/server';

const doc = {
  'development': {
    protocol: 'mqtt',
    protocolVersion: '1.0.0',
    url: 'development.gigantic-server.com'
  }
};
const docItem = new Server('development', doc.development);

describe('Servers model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new Servers([]);
      expect(servers.isEmpty()).toBeTruthy();
    });

    it('should return false if collection is not empty', function () {
      const servers = new Servers([docItem]);
      expect(servers.isEmpty()).toBeFalsy();
    });
  });

  describe('.get(id)', function () {
    it('should return a specific server Object if it is present', function () {
      const servers = new Servers([docItem]);
      expect(servers.get('development')).toBeTruthy();
    });

    it('should return undefined if a server is said Id is missing ', function () {
      const servers = new Servers([]);
      expect(servers.get('development')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    const servers = new Servers([docItem]);

    it('should return true if the said name is available', function () {
      expect(servers.has('development')).toBeTruthy();
    })

    it('should return false if the server name is missing', function () {
      expect(servers.has('production')).toBeFalsy();
    })
  })
})