import { BaseModel } from '../../../src/models/base';
import { bindings } from '../../../src/models/v3/mixins';
import { BindingsV3 } from '../../../src/models/v3';

describe('mixins', function() {
  describe('bindings', function() {
    class Model extends BaseModel {}

    it('should ignore JSON reference keys in bindings', function() {
      const doc = { bindings: { $ref: '#/components/messageBindings/myBindings', kafka: { bindingVersion: '0.4.0' } } };
      const model = new Model(doc);
      expect(bindings(model)).toBeInstanceOf(BindingsV3);
      expect(bindings(model).length).toEqual(1);
      expect(bindings(model).all()[0].protocol()).toEqual('kafka');
    });
  });
});
