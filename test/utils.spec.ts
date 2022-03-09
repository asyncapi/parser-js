import { xParserSpecParsed, xParserSpecStringified } from '../src/constants';
import { AsyncAPIDocument, BaseModel } from '../src/models';
import { toAsyncAPIDocument, isAsyncAPIDocument, isParsedDocument, isStringifiedDocument } from '../src/utils';

describe('utils', function() {
  describe('toAsyncAPIDocument()', function() {
    it('normal object should not return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument({})).toEqual(undefined);
    });

    it('null object should not return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument(null)).toEqual(undefined);
    });

    it('primitive should not return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument('AsyncAPI rocks!')).toEqual(undefined);
    });

    it('BaseModel instance should not return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument(new BaseModel({}))).toEqual(undefined);
    });

    it('AsyncAPIDocument instance should return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument(new AsyncAPIDocument({ asyncapi: '2.0.0' }))).toBeInstanceOf(AsyncAPIDocument);
    });

    it('parsed document should return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument({ [xParserSpecParsed]: true })).toBeInstanceOf(AsyncAPIDocument);
    });
    
    it('stringified document should return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument({ [xParserSpecParsed]: true, [xParserSpecStringified]: true })).toBeInstanceOf(AsyncAPIDocument);
    });

    it('stringified document (with missed parsed extension) should not return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument({ [xParserSpecStringified]: true })).toEqual(undefined);
    });
  });

  describe('isAsyncAPIDocument()', function() {
    it('normal object should not be AsyncAPI document', function() {
      expect(isAsyncAPIDocument({})).toEqual(false);
    });

    it('null object should not be AsyncAPI document', function() {
      expect(isAsyncAPIDocument(null)).toEqual(false);
    });

    it('primitive should not be AsyncAPI document', function() {
      expect(isAsyncAPIDocument('AsyncAPI rocks!')).toEqual(false);
    });

    it('BaseModel instance should not be AsyncAPI document', function() {
      expect(isAsyncAPIDocument(new BaseModel({}))).toEqual(false);
    });

    it('AsyncAPIDocument instance should be AsyncAPI document', function() {
      expect(isAsyncAPIDocument(new AsyncAPIDocument({ asyncapi: '2.0.0' }))).toEqual(true);
    });
  });

  describe('isParsedDocument()', function() {
    it('normal object should not be parsed document', function() {
      expect(isParsedDocument({})).toEqual(false);
    });

    it('null object should not be parsed document', function() {
      expect(isParsedDocument(null)).toEqual(false);
    });

    it('primitive should not be parsed document', function() {
      expect(isParsedDocument('AsyncAPI rocks!')).toEqual(false);
    });

    it('BaseModel instance should not be AsyncAPI document', function() {
      expect(isParsedDocument(new BaseModel({}))).toEqual(false);
    });

    it('AsyncAPIDocument instance should not be parsed document', function() {
      expect(isParsedDocument(new AsyncAPIDocument({ asyncapi: '2.0.0' }))).toEqual(false);
    });

    it('AsyncAPIDocument instance with proper extension should not be parsed document', function() {
      expect(isParsedDocument(new AsyncAPIDocument({ asyncapi: '2.0.0', [xParserSpecParsed]: true }))).toEqual(false);
    });

    it('object with proper extension should be parsed document', function() {
      expect(isParsedDocument({ [xParserSpecParsed]: true })).toEqual(true);
    });
  });

  describe('isStringifiedDocument()', function() {
    it('normal object should not be parsed document', function() {
      expect(isStringifiedDocument({})).toEqual(false);
    });

    it('null object should not be parsed document', function() {
      expect(isStringifiedDocument(null)).toEqual(false);
    });

    it('primitive should not be parsed document', function() {
      expect(isStringifiedDocument('AsyncAPI rocks!')).toEqual(false);
    });

    it('BaseModel instance should not be AsyncAPI document', function() {
      expect(isStringifiedDocument(new BaseModel({}))).toEqual(false);
    });

    it('AsyncAPIDocument instance should not be parsed document', function() {
      expect(isStringifiedDocument(new AsyncAPIDocument({ asyncapi: '2.0.0' }))).toEqual(false);
    });

    it('AsyncAPIDocument instance with proper extension should not be parsed document', function() {
      expect(isStringifiedDocument(new AsyncAPIDocument({ asyncapi: '2.0.0', [xParserSpecParsed]: true, [xParserSpecStringified]: true }))).toEqual(false);
    });

    it('object with only stringified extension should not be parsed document', function() {
      expect(isStringifiedDocument({ [xParserSpecStringified]: true })).toEqual(false);
    });

    it('object with proper extensions should be parsed document', function() {
      expect(isStringifiedDocument({ [xParserSpecParsed]: true, [xParserSpecStringified]: true })).toEqual(true);
    });
  });
});
