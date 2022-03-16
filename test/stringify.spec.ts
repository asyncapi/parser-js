import { xParserSpecParsed, xParserSpecStringified } from '../src/constants';
import { BaseModel, newAsyncAPIDocument } from '../src/models';
import { stringify, unstringify } from '../src/stringify';
import { createDetailedAsyncAPI } from '../src/utils';

describe('stringify & unstringify', function() {
  class Model extends BaseModel {}

  describe('stringify()', function() {
    it('should not stringify normal object', function() {
      expect(stringify({})).toEqual(undefined);
    });

    it('should not stringify null object', function() {
      expect(stringify(null)).toEqual(undefined);
    });

    it('should not stringify primitive', function() {
      expect(stringify('AsyncAPI rocks!')).toEqual(undefined);
    });

    it('should not stringify BaseModel instance', function() {
      expect(stringify(new Model({}))).toEqual(undefined);
    });

    it('should stringify parsed document', function() {
      expect(typeof stringify({ [xParserSpecParsed]: true })).toEqual('string');
    });

    it('should stringify (skip) stringified document', function() {
      expect(typeof stringify({ [xParserSpecParsed]: true, [xParserSpecStringified]: true })).toEqual('string');
    });

    it('should stringify AsyncAPIDocument instance', function() {
      const doc = { asyncapi: '2.0.0' };
      const detailed = createDetailedAsyncAPI(doc, doc);
      expect(typeof stringify(newAsyncAPIDocument(detailed))).toEqual('string');
    });
  });

  describe('unstringify()', function() {
    it('should not unstringify normal object', function() {
      expect(unstringify({})).toEqual(undefined);
    });

    it('should not unstringify null object', function() {
      expect(unstringify(null)).toEqual(undefined);
    });

    it('should not stringify primitive', function() {
      expect(unstringify('AsyncAPI rocks!')).toEqual(undefined);
    });

    it('should not stringify BaseModel instance', function() {
      expect(unstringify(new Model({}))).toEqual(undefined);
    });

    it('should not unstringify parsed document', function() {
      expect(unstringify({ [xParserSpecParsed]: true })).toEqual(undefined);
    });

    it('should unstringify stringified document', function() {
      expect(unstringify({ asyncapi: '2.0.0', [xParserSpecParsed]: true, [xParserSpecStringified]: true })).not.toEqual(undefined);
    });
  });
});
