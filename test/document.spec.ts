import { xParserSpecParsed, xParserSpecStringified } from '../src/constants';
import { BaseModel, AsyncAPIDocumentV2 } from '../src/models';
import { 
  createAsyncAPIDocument,
  toAsyncAPIDocument, 
  isAsyncAPIDocument, 
  isParsedDocument, 
  isStringifiedDocument,
} from '../src/document';
import { createDetailedAsyncAPI } from '../src/utils';

describe('utils', function() {
  class Model extends BaseModel {}

  describe('createAsyncAPIDocument()', function() {
    it('should create a valid document from v2.0.0', function() {
      const doc = { asyncapi: '2.0.0' };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      const d = createAsyncAPIDocument(detailed);
      expect(d.version()).toEqual(doc.asyncapi);
      expect(d).toBeInstanceOf(AsyncAPIDocumentV2);
    });
  
    it('should fail trying to create a document from a non supported spec version', function() {
      const doc = { asyncapi: '99.99.99' };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(() => createAsyncAPIDocument(detailed)).toThrow('Unsupported AsyncAPI version: 99.99.99');
    });
  });

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
      expect(toAsyncAPIDocument(createAsyncAPIDocument(detailed))).toBeInstanceOf(AsyncAPIDocumentV2);
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
      expect(isAsyncAPIDocument(createAsyncAPIDocument(detailed))).toEqual(true);
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
      expect(isParsedDocument(createAsyncAPIDocument(detailed))).toEqual(false);
    });

    it('AsyncAPIDocument instance with proper extension should not be parsed document', function() {
      const doc = { asyncapi: '2.0.0', [xParserSpecParsed]: true };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(isParsedDocument(createAsyncAPIDocument(detailed))).toEqual(false);
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
      expect(isStringifiedDocument(createAsyncAPIDocument(detailed))).toEqual(false);
    });

    it('AsyncAPIDocument instance with proper extension should not be parsed document', function() {
      const doc = { asyncapi: '2.0.0', [xParserSpecParsed]: true, [xParserSpecStringified]: true };
      const detailed = createDetailedAsyncAPI(doc, doc as any);
      expect(isStringifiedDocument(createAsyncAPIDocument(detailed))).toEqual(false);
    });

    it('object with only stringified extension should not be parsed document', function() {
      expect(isStringifiedDocument({ [xParserSpecStringified]: true })).toEqual(false);
    });

    it('object with proper extensions should be parsed document', function() {
      expect(isStringifiedDocument({ [xParserSpecParsed]: true, [xParserSpecStringified]: true })).toEqual(true);
    });
  });
});
