import { SecurityRequirements } from '../../../src/models/v2/security-requirements';
import { SecurityRequirement } from '../../../src/models/v2/security-requirement';

const requirementItem = new SecurityRequirement({ schemaId: 'test' } as any);

describe('SecurityRequirements model', function () {
  describe('.isEmpty()', function () {
    it('should return true if collection is empty', function () {
      const requirements = new SecurityRequirements([]);
      expect(requirements.isEmpty()).toEqual(true);
    });

    it('should return false if collection is not empty', function () {
      const requirements = new SecurityRequirements([requirementItem]);
      expect(requirements.isEmpty()).toEqual(false);
    });
  });

  describe('.get(id)', function () {
    it('should return a specific SecurityRequirement if it is present', function () {
      const requirements = new SecurityRequirements([requirementItem]);
      expect(requirements.get('test')).toBeTruthy();
    });

    it('should return undefined if specific SecurityRequirement is missing', function () {
      const requirements = new SecurityRequirements([]);
      expect(requirements.get('test')).toBeUndefined();
    });
  });

  describe('.has(id)', function () {
    it('should return true if the said id is available', function () {
      const requirements = new SecurityRequirements([requirementItem]);
      expect(requirements.has('test')).toEqual(true);
    })

    it('should return false if the SecurityRequirement id is missing', function () {
      const requirements = new SecurityRequirements([requirementItem]);
      expect(requirements.has('anotherId')).toEqual(false);
    })
  })
})