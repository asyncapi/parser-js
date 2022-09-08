import { xParserSpecParsed, xParserSpecStringified } from '../src/constants';
import { newAsyncAPIDocument, BaseModel, AsyncAPIDocumentV2 } from '../src/models';
import { 
  toAsyncAPIDocument, 
  isAsyncAPIDocument, 
  isParsedDocument, 
  isStringifiedDocument,
} from '../src/document';
import { createDetailedAsyncAPI } from '../src/utils';

describe('utils', function() {
  class Model extends BaseModel {}

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
      expect(toAsyncAPIDocument(new Model({}))).toEqual(undefined);
    });

    it('AsyncAPIDocument instance should return AsyncAPIDocument instance', function() {
      const doc = { asyncapi: '2.0.0' };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(toAsyncAPIDocument(newAsyncAPIDocument(detailed))).toBeInstanceOf(AsyncAPIDocumentV2);
    });

    it('parsed document should return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument({ asyncapi: '2.0.0', [xParserSpecParsed]: true })).toBeInstanceOf(AsyncAPIDocumentV2);
    });
    
    it('stringified document should return AsyncAPIDocument instance', function() {
      expect(toAsyncAPIDocument({ asyncapi: '2.0.0', [xParserSpecParsed]: true, [xParserSpecStringified]: true })).toBeInstanceOf(AsyncAPIDocumentV2);
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
      expect(isAsyncAPIDocument(new Model({}))).toEqual(false);
    });

    it('AsyncAPIDocument instance should be AsyncAPI document', function() {
      const doc = { asyncapi: '2.0.0' };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(isAsyncAPIDocument(newAsyncAPIDocument(detailed))).toEqual(true);
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
      expect(isParsedDocument(new Model({}))).toEqual(false);
    });

    it('AsyncAPIDocument instance should not be parsed document', function() {
      const doc = { asyncapi: '2.0.0' };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(isParsedDocument(newAsyncAPIDocument(detailed))).toEqual(false);
    });

    it('AsyncAPIDocument instance with proper extension should not be parsed document', function() {
      const doc = { asyncapi: '2.0.0', [xParserSpecParsed]: true };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(isParsedDocument(newAsyncAPIDocument(detailed))).toEqual(false);
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
      expect(isStringifiedDocument(new Model({}))).toEqual(false);
    });

    it('AsyncAPIDocument instance should not be parsed document', function() {
      const doc = { asyncapi: '2.0.0' };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(isStringifiedDocument(newAsyncAPIDocument(detailed))).toEqual(false);
    });

    it('AsyncAPIDocument instance with proper extension should not be parsed document', function() {
      const doc = { asyncapi: '2.0.0', [xParserSpecParsed]: true, [xParserSpecStringified]: true };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(isStringifiedDocument(newAsyncAPIDocument(detailed))).toEqual(false);
    });

    it('object with only stringified extension should not be parsed document', function() {
      expect(isStringifiedDocument({ [xParserSpecStringified]: true })).toEqual(false);
    });

    it('object with proper extensions should be parsed document', function() {
      expect(isStringifiedDocument({ [xParserSpecParsed]: true, [xParserSpecStringified]: true })).toEqual(true);
    });
  });
});
