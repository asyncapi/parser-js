const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs');
const path = require('path');
const parser = require('../lib');
const ParserError = require('../lib/errors/parser-error');
const { offset } = require('./testsUtils'); 

chai.use(chaiAsPromised);
const expect = chai.expect;

const invalidYAML = fs.readFileSync(path.resolve(__dirname, './wrong/malformed-asyncapi.yaml'), 'utf8');
const inputYAML = fs.readFileSync(path.resolve(__dirname, './good/asyncapi.yaml'), 'utf8');
const inputYAMLNoChannels = fs.readFileSync(path.resolve(__dirname, './good/asyncapi-no-channels.yml'), 'utf8');
const inputYAMLMessagesChannels = fs.readFileSync(path.resolve(__dirname, './good/asyncapi-messages-channels.yml'), 'utf8');
const inputYAMLCircular = fs.readFileSync(path.resolve(__dirname, './good/circular-refs.yaml'), 'utf8');
const inputJSON = fs.readFileSync(path.resolve(__dirname, './good/asyncapi.json'), 'utf8');
const invalidAsyncapiYAML = fs.readFileSync(path.resolve(__dirname, './wrong/invalid-asyncapi.yaml'), 'utf8');
const invalidAsyncpiJSON = fs.readFileSync(path.resolve(__dirname, './wrong/invalid-asyncapi.json'), 'utf8');
const outputJSON = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"externalDocs":{"x-extension":true,"url":"https://company.com/docs"},"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"},"x-parser-original-traits":[{"externalDocs":{"url":"https://company.com/docs"}}]}},"oneOfMessageChannel":{"publish":{"message":{"oneOf":[{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}]}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidYamlOutput = '{"asyncapi":"2.0.0","info":{"version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidJsonOutput = '{"asyncapi":"2.0.0","info":{"version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string"}}}}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}}}';
const outputJsonWithRefs = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":null}}}}},"oneOfMessageChannel":{"publish":{"message":{"oneOf":[{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":null}}}]}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":null}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":null}}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidAsyncAPI = '{"asyncapi":"2.0.0","info":{}}';
const outputJSONNoChannels = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"},"x-parser-original-traits":[{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}],"schemaFormat":"application\/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}}}}}';
const outputJSONMessagesChannels = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-traits":[{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}],"schemaFormat":"application\/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"channelMessage"}}}},"components":{"messages":{"channelMessage":{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-traits":[{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}],"schemaFormat":"application\/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"channelMessage"},"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-traits":[{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}],"schemaFormat":"application\/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"}}}}}';

/* eslint-disable sonarjs/cognitive-complexity */
/**
 * Disabled the rule for this function as there is no way to make it shorter in a meaningfull way
 * This function should always be used in tests where errors are evaluated to make sure they always work even if proper error is not thrown
 * @private
 * @param  {Function} fn Function that you want to test
 * @param  {Object} validationObject Error object to evaluate against the error thrown by fn()
*/
const checkErrorWrapper = async (fn, validationObject) => {
  const { type, message, title, refs, detail, location, validationErrors, parsedJSON } = validationObject;

  try {
    await fn();
    throw Error('This error should not be reachable. If you reached it, it means the function did not throw a proper error and executed successfully.');
  } catch (e) {
    const isProperError = e instanceof ParserError;
    if (!isProperError) console.log(e);

    if (isProperError) expect(e instanceof ParserError).to.equal(true);
    if (type) expect(e).to.have.own.property('type', type);
    if (message) expect(e).to.have.own.property('message', message);
    if (title) expect(e).to.have.own.property('title', title);
    if (detail) expect(e).to.have.own.property('detail', detail);
    if (refs) expect(e.refs).to.deep.equal(refs);
    if (location) expect(e.location).to.deep.equal(location);
    if (validationErrors) expect(e.validationErrors).to.deep.equal(validationErrors);
    if (parsedJSON) expect(JSON.stringify(e.parsedJSON)).to.deep.equal(parsedJSON);
  }
};

describe('parse()', function() {
  it('should parse YAML', async function() {
    const result = await parser.parse(inputYAML, { path: __filename });
    expect(JSON.stringify(result.json())).to.equal(outputJSON);
  });

  it('should parse 2 AsyncAPI specs in Promise.all() and not fail with resolving references', async function() {
    const input = [
      parser.parse(inputYAML, { path: __filename }), 
      parser.parse(inputYAML, { path: __filename })
    ];
    const result = await Promise.all(input);
    expect(JSON.stringify(result[0].json())).to.equal(outputJSON);
    expect(JSON.stringify(result[1].json())).to.equal(outputJSON);
  });

  it('should apply traits to messages even with empty channels object', async function() {
    const result = await parser.parse(inputYAMLNoChannels, { path: __filename });
    expect(JSON.stringify(result.json())).to.equal(outputJSONNoChannels);
  });  
  
  it('should apply traits to messages used and not used in a channel', async function() {
    const result = await parser.parse(inputYAMLMessagesChannels, { path: __filename });
    expect(JSON.stringify(result.json())).to.equal(outputJSONMessagesChannels);
  });
  
  it('should fail when asyncapi is not valid', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'There were errors validating the AsyncAPI document.',
      parsedJSON: invalidAsyncAPI,
      validationErrors: [{
        title: '/info should have required property \'title\'',
        location: { 
          endColumn: 31,
          endLine: 1,
          endOffset: offset(29, 1),
          jsonPointer: '/info',
          startColumn: 29,
          startLine: 1,
          startOffset: offset(27, 1)
        }
      },
      {
        title: '/info should have required property \'version\'',
        location: { 
          endColumn: 31,
          endLine: 1,
          endOffset: offset(29, 1),
          jsonPointer: '/info',
          startColumn: 29,
          startLine: 1,
          startOffset: offset(27, 1) 
        }
      },
      {
        title: '/ should have required property \'channels\'',
        location: { jsonPointer: '/' }
      }]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(invalidAsyncAPI);
    }, expectedErrorObject);
  });
  
  it('should fail when asyncapi is not valid (yaml)', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'There were errors validating the AsyncAPI document.',
      parsedJSON: invalidYamlOutput,
      validationErrors: [
        {
          title: '/info should have required property \'title\'',
          location: {
            jsonPointer: '/info',
            startLine: 2,
            startColumn: 1,
            startOffset: offset(16, 2),
            endLine: 3,
            endColumn: 19,
            endOffset: offset(40, 3),
          }
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(invalidAsyncapiYAML, { path: __filename });
    }, expectedErrorObject);
  });

  it('should fail when asyncapi is not valid (ref with line break) (yaml)', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'There were errors validating the AsyncAPI document.',
      validationErrors: [
        {
          title: '/channels/smartylighting~1streetlights~11~10~1action~1{streetlightId}~1turn~1off/parameters/streetlightId/$ref should match format \"uri-reference\"',
          location: {
            jsonPointer: '/channels/smartylighting~1streetlights~11~10~1action~1{streetlightId}~1turn~1off/parameters/streetlightId/$ref',
            startLine: 67,
            startColumn: 9,
            startOffset: offset(1970, 67),
            endLine: 68,
            endColumn: 46,
            endOffset: offset(2024, 68),
          }
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(fs.readFileSync(path.resolve(__dirname, './wrong/invalid-asyncapi-with-ref-with-line-break.yaml'), 'utf8'), {
        path: __filename,
      });
    }, expectedErrorObject);
  });
  
  it('should fail when asyncapi is not valid (json)', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'There were errors validating the AsyncAPI document.',
      parsedJSON: invalidJsonOutput,
      validationErrors: [
        {
          title: '/info should have required property \'title\'',
          location: {
            jsonPointer: '/info',
            startLine: 3,
            startColumn: 11,
            startOffset: offset(33, 3),
            endLine: 5,
            endColumn: 4,
            endOffset: offset(58, 5),
          }
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(invalidAsyncpiJSON, { path: __filename });
    }, expectedErrorObject);
  });
  
  it('should fail when it is not possible to convert asyncapi to json', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/impossible-to-convert-to-json',
      title: 'Could not convert AsyncAPI to JSON.',
      detail: 'Most probably the AsyncAPI document contains invalid YAML or YAML features not supported in JSON.'
    };

    await checkErrorWrapper(async () => {
      await parser.parse('bad');
    }, expectedErrorObject);
  });

  it('should fail when asyncapi is not present', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/missing-asyncapi-field',
      title: 'The `asyncapi` field is missing.',
      parsedJSON: '{"bad":true}'
    };

    await checkErrorWrapper(async () => {
      await parser.parse('bad: true');
    }, expectedErrorObject);
  });

  it('should fail when asyncapi version is not supported', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/unsupported-version',
      title: 'Version 1.2.0 is not supported.',
      detail: 'Please use latest version of the specification.',
      parsedJSON: '{"asyncapi":"1.2.0"}',
      validationErrors: [
        {
          jsonPointer: '/asyncapi',
          startLine: 1,
          startColumn: 1,
          startOffset: offset(0, 1),
          endLine: 1,
          endColumn: 16,
          endOffset: offset(15, 1),
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse('asyncapi: 1.2.0');
    }, expectedErrorObject);
  });

  it('should fail when asyncapi is not yaml nor json', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/invalid-yaml',
      title: 'The provided YAML is not valid.',
      detail: 'duplicated mapping key at line 2, column -4:\n    bad:\n    ^',
      location: { startOffset: offset(5, 2), startLine: 2, startColumn: -4 }
    };

    await checkErrorWrapper(async () => {
      await parser.parse('bad:\nbad:');
    }, expectedErrorObject);
  });

  it('should fail to resolve relative files when options.path is not provided', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/dereference-error',
      title: `Error opening file "${path.resolve(process.cwd(), 'refs/refed.yaml')}" \nENOENT: no such file or directory, open '${path.resolve(process.cwd(), 'refs/refed.yaml')}'`,
      parsedJSON: outputJsonWithRefs,
      refs: [
        {
          jsonPointer: '/components/schemas/testSchema/properties/test/$ref',
          startLine: 35,
          startColumn: 11,
          startOffset: offset(736, 35),
          endLine: 35,
          endColumn: 34,
          endOffset: offset(759, 35)
        }
      ]
    };
    await checkErrorWrapper(async () => {
      await parser.parse(inputYAML);
    }, expectedErrorObject);
  });

  it('should offer information about YAML line and column where $ref errors are located', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/dereference-error',
      title: `Error opening file "${path.resolve(process.cwd(), 'refs/refed.yaml')}" \nENOENT: no such file or directory, open '${path.resolve(process.cwd(), 'refs/refed.yaml')}'`,
      refs: [
        {
          jsonPointer: '/components/schemas/testSchema/properties/test/$ref',
          startLine: 35,
          startColumn: 11,
          startOffset: offset(736, 35),
          endLine: 35,
          endColumn: 34,
          endOffset: offset(759, 35)
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(inputYAML);
    }, expectedErrorObject);
  });
  
  it('should offer information about JSON line and column where $ref errors are located', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/dereference-error',
      title: `Error opening file "${path.resolve(process.cwd(), 'refs/refed.yaml')}" \nENOENT: no such file or directory, open '${path.resolve(process.cwd(), 'refs/refed.yaml')}'`,
      refs: [
        {
          jsonPointer: '/components/schemas/testSchema/properties/test/$ref',
          startLine: 38,
          startColumn: 21,
          startOffset: offset(599, 38),
          endLine: 38,
          endColumn: 38,
          endOffset: offset(616, 38)
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(inputJSON);
    }, expectedErrorObject);
  });
  
  it('should not offer information about JS line and column where $ref errors are located if format is JS', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/dereference-error',
      title: `Error opening file "${path.resolve(process.cwd(), 'refs/refed.yaml')}" \nENOENT: no such file or directory, open '${path.resolve(process.cwd(), 'refs/refed.yaml')}'`,
      refs: [
        {
          jsonPointer: '/components/schemas/testSchema/properties/test/$ref',
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(JSON.parse(inputJSON));
    }, expectedErrorObject);
  });

  it('should offer information about missing HTTP $refs', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/dereference-error',
      title: 'Error downloading https://example.com/components/messages/testMessage \nHTTP ERROR 404',
      refs: [
        {
          jsonPointer: '/channels/mychannel/publish/message/$ref',
          startLine: 9,
          startColumn: 9,
          startOffset: offset(116, 9),
          endLine: 9,
          endColumn: 68,
          endOffset: offset(175, 9),
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(fs.readFileSync(path.resolve(__dirname, './wrong/inexisting-http-ref.yaml'), 'utf8'), {
        path: 'https://example.com',
        resolve: {
          file: false
        }
      });
    }, expectedErrorObject);
  });
  
  it('should offer information about missing root $refs', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/dereference-error',
      title: 'Error downloading https://example.com/components/messages/testMessage \nHTTP ERROR 404',
      refs: [
        {
          jsonPointer: '/channels/mychannel/subscribe/message/$ref',
          startLine: 9,
          startColumn: 9,
          startOffset: offset(118, 9),
          endLine: 9,
          endColumn: 49,
          endOffset: offset(158, 9),
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(fs.readFileSync(path.resolve(__dirname, './wrong/inexisting-root-ref.yaml'), 'utf8'), {
        path: 'https://example.com',
        resolve: {
          file: false
        }
      });
    }, expectedErrorObject);
  });
  
  it('should offer information about missing local $refs', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/dereference-error',
      title: 'Token "components" does not exist.',
      refs: [
        {
          jsonPointer: '/channels/mychannel2/publish/message/$ref',
          startLine: 9,
          startColumn: 9,
          startOffset: offset(117, 9),
          endLine: 9,
          endColumn: 50,
          endOffset: offset(158, 9),
        }
      ]
    };

    await checkErrorWrapper(async () => {
      await parser.parse(fs.readFileSync(path.resolve(__dirname, './wrong/inexisting-local-ref.yaml'), 'utf8'), {
        path: 'https://example.com',
        resolve: {
          file: false
        }
      });
    }, expectedErrorObject);
  });

  it('should throw proper error even if issue is inside $refed file of a $refed file', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/schema-validation-errors',
      title: 'This is not a valid AsyncAPI Schema Object.'
    };

    await checkErrorWrapper(async () => {
      await parser.parse(fs.readFileSync(path.resolve(__dirname, './wrong/good-ref-to-broken-file.yaml'), 'utf8'), {
        path: __filename,
      });
    }, expectedErrorObject);
  });

  it('should throw error if document is invalid YAML', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/invalid-yaml',
      title: 'The provided YAML is not valid.',
      detail: 'bad indentation of a mapping entry at line 19, column 11:\n              $ref: "#/components/schemas/sentAt"\n              ^',
      location: { startOffset: offset(460, 19), startLine: 19, startColumn: 11 }
    };

    await checkErrorWrapper(async () => {
      await parser.parse(invalidYAML, { path: __filename });
    }, expectedErrorObject);
  });
  
  it('should throw error if document is invalid JSON', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/invalid-json',
      title: 'The provided JSON is not valid.',
      detail: 'Unexpected token j in JSON at position 12 while parsing near \' {"invalid "json" }\'',
      location: { startOffset: offset(12, 1), startLine: 1, startColumn: 12 }
    };

    await checkErrorWrapper(async () => {
      await parser.parse(' {"invalid "json" }');
    }, expectedErrorObject);
  });

  it('should throw error if document is null or falsey', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/null-or-falsey-document',
      title: 'Document can\'t be null or falsey.',
    };
    await checkErrorWrapper(async () => {
      await parser.parse('');
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(false);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(null);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(undefined);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(NaN);
    }, expectedErrorObject);
  });

  it('should throw error if document is not string nor object', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/invalid-document-type',
      title: 'The AsyncAPI document has to be either a string or a JS object.',
    };

    await checkErrorWrapper(async () => {
      await parser.parse(true);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse([]);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(new Map());
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(new Set());
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(new WeakMap());
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(new WeakSet());
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(1);
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(Symbol('test'));
    }, expectedErrorObject);
    await checkErrorWrapper(async () => {
      await parser.parse(() => {});
    }, expectedErrorObject);
  });

  it('should properly mark circular references', async function() {
    const result = await parser.parse(inputYAMLCircular, { path: __filename });
    expect(result.components().schema('RecursiveAncestor').properties()['ancestorChildren'].isCircular()).to.equal(true);
    expect(result.components().schema('RecursiveSelf').properties()['selfSomething'].properties()['test'].properties()['ancestorChildren'].isCircular()).to.equal(true);
    expect(result.channel('external/file').publish().messages()[0].payload().properties()['testExt'].properties()['children'].isCircular()).to.equal(true);
    //not testing on a model level as required xParserCircle value is added before model construction so we need to test through calling parser function
    expect(result.hasCircular()).to.equal(true);
    //we want false here, even though this schema has some circular refs in some props, it is not circular, but just specific items
    expect(result.components().schema('RecursiveSelf').isCircular()).to.equal(false);
    expect(result.components().schema('NonRecursive').isCircular()).to.equal(false);
    expect(result.components().schema('RecursiveSelf').properties()['selfChildren'].isCircular()).to.equal(true);
    expect(result.components().schema('RecursiveSelf').properties()['selfObjectChildren'].isCircular()).to.equal(false);
    expect(result.components().schema('RecursiveSelf').properties()['selfObjectChildren'].hasCircularProps()).to.equal(true);
    expect(result.components().schema('RecursiveSelf').properties()['selfObjectChildren'].circularProps()[0]).to.equal('test');
    expect(result.components().schema('RecursiveSelf').properties()['selfObjectChildren'].circularProps().length).to.equal(1);
    expect(result.components().schema('NonRecursive').properties()['child'].isCircular()).to.equal(false);
    //NormalSchemaB is referred twice, from NormalSchemaA and NormalSchemaC. 
    //If seenObjects array is not handled properly, once NormalSchemaB is seen for a second time while traversing NormalSchemaC, then NormalSchemaC is marked as object holding circular refs
    //This is why it is important to check that NormalSchemaC is or sure not marked as circular
    expect(result.components().schema('NormalSchemaC').isCircular()).to.equal(false);
  });
});

it('should not apply traits', async function() {
  const outputJsonNoApplyTraits = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}}},"oneOfMessageChannel":{"publish":{"message":{"oneOf":[{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}]}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
  const result = await parser.parse(inputYAML, { path: __filename, applyTraits: false });
  await expect(JSON.stringify(result.json())).to.equal(outputJsonNoApplyTraits);
});

it('should apply traits', async function() {
  const outputJsonApplyTraits = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"externalDocs":{"x-extension":true,"url":"https://company.com/docs"},"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"},"x-parser-original-traits":[{"externalDocs":{"url":"https://company.com/docs"}}]}},"oneOfMessageChannel":{"publish":{"message":{"oneOf":[{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}]}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
  const result = await parser.parse(inputYAML, { path: __filename, applyTraits: true });
  await expect(JSON.stringify(result.json())).to.equal(outputJsonApplyTraits);
});

describe('registerSchemaParser()', function() {
  it('no errors can be thrown', function() {
    const parserModule = {
      parse: () => {},
      getMimeTypes: () => ['schemaFormat1', 'schemaFormat2']
    };

    expect(() => parser.registerSchemaParser(parserModule)).to.not.throw();
  });

  it('should throw error that required functions are missing', async function() {
    const parserModule = {
      parse: () => {}
    };

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/impossible-to-register-parser',
      title: 'parserModule must have parse() and getMimeTypes() functions.'
    };

    await checkErrorWrapper(async () => {
      parser.registerSchemaParser(parserModule);
    }, expectedErrorObject);
  });
});
