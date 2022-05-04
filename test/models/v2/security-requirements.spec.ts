import { SecurityRequirements } from '../../../src/models/v2/security-requirements';
import { SecurityRequirement } from '../../../src/models/v2/security-requirement';

const securityRequirement = {
  security: ['write:test'],
};
const securityRequirementItem = new SecurityRequirement(securityRequirement);

describe('SecurityRequirements model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const servers = new SecurityRequirements([]);
      expect(servers.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const servers = new SecurityRequirements([securityRequirementItem]);
      expect(servers.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return always undefined', function () {
      const servers = new SecurityRequirements([]);
      expect(servers.get('write:test')).toBeUndefined();
      expect(servers.get('security')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return always undefined', function () {
      const servers = new SecurityRequirements([]);
      expect(servers.has('write:test')).toEqual(false);
      expect(servers.has('security')).toEqual(false);
    });
  })
})