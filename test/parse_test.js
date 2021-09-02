const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs');
const path = require('path');
const parser = require('../lib');
const { xParserSpecParsed } = require('../lib/constants');
const { offset, checkErrorWrapper } = require('./testsUtils');

chai.use(chaiAsPromised);
const expect = chai.expect;

const invalidYAML = fs.readFileSync(path.resolve(__dirname, './wrong/malformed-asyncapi.yaml'), 'utf8');
const inputYAML = fs.readFileSync(path.resolve(__dirname, './good/asyncapi.yaml'), 'utf8');
const inputYAMLNoComponents = fs.readFileSync(path.resolve(__dirname, './good/asyncapi-no-components.yml'), 'utf8');
const inputYAMLNoChannels = fs.readFileSync(path.resolve(__dirname, './good/asyncapi-no-channels.yml'), 'utf8');
const inputYAMLMessagesChannels = fs.readFileSync(path.resolve(__dirname, './good/asyncapi-messages-channels.yml'), 'utf8');
const inputYAMLCircular = fs.readFileSync(path.resolve(__dirname, './good/circular-refs.yaml'), 'utf8');
const inputJSON = fs.readFileSync(path.resolve(__dirname, './good/asyncapi.json'), 'utf8');
const invalidAsyncapiYAML = fs.readFileSync(path.resolve(__dirname, './wrong/invalid-asyncapi.yaml'), 'utf8');
const invalidAsyncpiJSON = fs.readFileSync(path.resolve(__dirname, './wrong/invalid-asyncapi.json'), 'utf8');
const outputJSONForObjectInput = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-5>"}},"x-parser-schema-id":"<anonymous-schema-4>"}},"x-parser-schema-id":"testSchema"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-5>"}},"x-parser-schema-id":"<anonymous-schema-4>"}},"x-parser-schema-id":"testSchema"}}},"x-parser-spec-parsed":true}';
const outputJSON = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"externalDocs":{"x-extension":true,"url":"https://company.com/docs"},"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"},"x-parser-original-traits":[{"externalDocs":{"url":"https://company.com/docs"}}]}},"oneOfMessageChannel":{"publish":{"message":{"oneOf":[{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}]}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}},"x-parser-spec-parsed":true}';
const outputJSONNoComponents = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"/test/tester":{"subscribe":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"x-parser-spec-parsed":true}';
const invalidYamlOutput = '{"asyncapi":"2.0.0","info":{"test": true,"version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}}}},"test":true,"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidJsonOutput = '{"asyncapi":"2.0.0","info":{"test":true,"version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string"}}}}}}},"test":true,"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}}}}}';
const outputJsonWithRefs = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":null}}}}},"oneOfMessageChannel":{"publish":{"message":{"oneOf":[{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":null}}}]}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string"},"test":null}}}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string"},"test":null}}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}}}';
const invalidAsyncAPI = '{"asyncapi":"2.0.0","info":{}}';
const outputJSONNoChannels = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"},"x-parser-original-traits":[{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}],"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}}},"x-parser-spec-parsed":true}';
const outputJSONMessagesChannels = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-traits":[{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"channelMessage"}}}},"components":{"messages":{"channelMessage":{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-traits":[{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}],"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"channelMessage"},"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string","x-parser-schema-id":"<anonymous-schema-5>"}},"x-parser-schema-id":"<anonymous-schema-4>"},"x-parser-original-traits":[{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}],"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension","headers":{"type":"object","properties":{"some-common-header":{"type":"string"}}}}}},"x-parser-spec-parsed":true}';

describe('parse()', function() {
  it('should parse YAML', async function() {
    const result = await parser.parse(inputYAML, { path: __filename });
    expect(JSON.stringify(result.json())).to.equal(outputJSON);
  });
  
  it('should parse AsyncAPI document passed as JS object', async function() {
    const object = JSON.parse(inputJSON);
    const result = await parser.parse(object, { path: __filename });
    expect(JSON.stringify(result.json())).to.equal(outputJSONForObjectInput);
  });

  it('should parse YAML correctly when no components object', async function() {
    const result = await parser.parse(inputYAMLNoComponents, { path: __filename });
    expect(JSON.stringify(result.json())).to.equal(outputJSONNoComponents);
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
      parsedJSON: JSON.parse(invalidAsyncAPI),
      validationErrors: [{
        title: '/info should have required property \'title\'',
        location: { 
          endColumn: 31,
          endLine: 1,
          endOffset: 29,
          jsonPointer: '/info',
          startColumn: 29,
          startLine: 1,
          startOffset: 27
        }
      },
      {
        title: '/info should have required property \'version\'',
        location: { 
          endColumn: 31,
          endLine: 1,
          endOffset: 29,
          jsonPointer: '/info',
          startColumn: 29,
          startLine: 1,
          startOffset: 27 
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
      parsedJSON: JSON.parse(invalidYamlOutput),
      validationErrors: [
        {
          title: '/ should NOT have additional properties',
          location: {
            jsonPointer: '/test',
            startLine: 15,
            startColumn: 1,
            startOffset: offset(305,15),
            endLine: 15,
            endColumn: 11,
            endOffset: offset(315,15)
          }
        },
        {
          title: '/info should NOT have additional properties',
          location: {
            jsonPointer: '/info/test',
            startLine: 3,
            startColumn: 3,
            startOffset: offset(24,3),
            endLine: 3,
            endColumn: 13,
            endOffset: offset(34,3)
          }
        },
        {
          title: '/info should have required property \'title\'',
          location: {
            jsonPointer: '/info',
            startLine: 2,
            startColumn: 1,
            startOffset: offset(16,2),
            endLine: 4,
            endColumn: 19,
            endOffset: offset(53,4)
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
      parsedJSON: JSON.parse(invalidJsonOutput),
      validationErrors: [
        {
          title: '/ should NOT have additional properties',
          location: {
            jsonPointer: '/test',
            startLine: 23,
            startColumn: 11,
            startOffset: offset(299,23),
            endLine: 23,
            endColumn: 15,
            endOffset: offset(303,23)
          }
        },
        {
          title: '/info should NOT have additional properties',
          location: {
            jsonPointer: '/info/test',
            startLine: 4,
            startColumn: 12,
            startOffset: offset(45,4),
            endLine: 4,
            endColumn: 16,
            endOffset: offset(49,4)
          }
        },
        {
          title: '/info should have required property \'title\'',
          location: {
            jsonPointer: '/info',
            startLine: 3,
            startColumn: 11,
            startOffset: offset(33,3),
            endLine: 6,
            endColumn: 4,
            endOffset: offset(74,6)
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
      parsedJSON: JSON.parse('{"bad":true}')
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
      parsedJSON: JSON.parse('{"asyncapi":"1.2.0"}'),
      validationErrors: [
        {
          jsonPointer: '/asyncapi',
          startLine: 1,
          startColumn: 1,
          startOffset: 0,
          endLine: 1,
          endColumn: 16,
          endOffset: 15
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
      location: { startOffset: 5, startLine: 2, startColumn: -4 }
    };

    await checkErrorWrapper(async () => {
      await parser.parse('bad:\nbad:');
    }, expectedErrorObject);
  });

  it('should fail to resolve relative files when options.path is not provided', async function() {
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/dereference-error',
      title: `Error opening file "${path.resolve(process.cwd(), 'refs/refed.yaml')}" \nENOENT: no such file or directory, open '${path.resolve(process.cwd(), 'refs/refed.yaml')}'`,
      parsedJSON: JSON.parse(outputJsonWithRefs),
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
      location: { startOffset: 12, startLine: 1, startColumn: 12 }
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

  it('Should include schemas after circular property', async function() {
    const input = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"test":{"publish":{"message":{"payload":{"$ref":"#/components/schemas/testSchema"}}}}},"components":{"schemas":{"testSchema":{"$id":"testSchema","type":"object","test":true,"properties":{"recursiveTestProp":{"$ref":"#/components/schemas/testSchema"},"testProp":{"$id":"testString","type":"string"}}}}}}';
    const result = await parser.parse(input, { path: __filename });
    const schemas = new Map();
    const cb = (schema) => {
      schemas.set(schema.uid(), schema);
    };
    result.traverseSchemas(cb);

    //Ensure the actual keys are as expected
    const schemaKeys = Array.from(schemas.keys());
    expect(schemaKeys).to.deep.equal([
      'testSchema',
      'testString'
    ]);
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
  const outputJsonNoApplyTraits = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"traits":[{"externalDocs":{"url":"https://company.com/docs"}}],"externalDocs":{"x-extension":true,"url":"https://irrelevant.com"},"message":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}}},"oneOfMessageChannel":{"publish":{"message":{"oneOf":[{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}]}}}},"components":{"messages":{"testMessage":{"traits":[{"x-some-extension":"some extension"}],"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}},"x-parser-spec-parsed":true}';
  const result = await parser.parse(inputYAML, { path: __filename, applyTraits: false });

  await expect(JSON.stringify(result.json())).to.equal(outputJsonNoApplyTraits);
});

it('should apply traits', async function() {
  const outputJsonApplyTraits = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"externalDocs":{"x-extension":true,"url":"https://company.com/docs"},"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"},"x-parser-original-traits":[{"externalDocs":{"url":"https://company.com/docs"}}]}},"oneOfMessageChannel":{"publish":{"message":{"oneOf":[{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}]}}}},"components":{"messages":{"testMessage":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"},"x-some-extension":"some extension","x-parser-original-traits":[{"x-some-extension":"some extension"}],"x-parser-original-schema-format":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-original-payload":{"type":"object","properties":{"name":{"type":"string"},"test":{"type":"object","properties":{"testing":{"type":"string"}}}}},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"testMessage"}},"schemas":{"testSchema":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-1>"},"test":{"type":"object","properties":{"testing":{"type":"string","x-parser-schema-id":"<anonymous-schema-3>"}},"x-parser-schema-id":"<anonymous-schema-2>"}},"x-parser-schema-id":"testSchema"}},"messageTraits":{"extension":{"x-some-extension":"some extension"}},"operationTraits":{"docs":{"externalDocs":{"url":"https://company.com/docs"}}}},"x-parser-spec-parsed":true}';
  const result = await parser.parse(inputYAML, { path: __filename, applyTraits: true });
  await expect(JSON.stringify(result.json())).to.equal(outputJsonApplyTraits);
});

it('should apply `x-parser-spec-parsed` extension', async function() {
  const parsedSpec = await parser.parse(inputYAML, { path: __filename });
  await expect(parsedSpec.json()[String(xParserSpecParsed)]).to.equal(true);
});

it('should parse and include examples', async function() {
  let result = await parser.parse(fs.readFileSync(path.resolve(__dirname, './good/asyncapi-messages-example.yml'), 'utf8'), { path: __filename });
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].name).to.equal('Example1');
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].summary).to.equal('Example1 summary');
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].payload.name).to.equal('My name');
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].headers['some-common-header']).to.equal('My header');

  result = await parser.parse(fs.readFileSync(path.resolve(__dirname, './good/asyncapi-messages-example-payload.yml'), 'utf8'), { path: __filename });
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].name).to.equal('Example1');
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].summary).to.equal('Example1 summary');
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].payload.name).to.equal('My name');

  result = await parser.parse(fs.readFileSync(path.resolve(__dirname, './good/asyncapi-messages-example-headers.yml'), 'utf8'), { path: __filename });
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].name).to.equal('Example1');
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].summary).to.equal('Example1 summary');
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].headers['some-common-header']).to.equal('My header');

  result = await parser.parse(fs.readFileSync(path.resolve(__dirname, './good/asyncapi-messages-example-optional.yml'), 'utf8'), { path: __filename });
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].name).to.equal(undefined);
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].summary).to.equal(undefined);
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].payload.name).to.equal('My name');
  expect(result.channel('myChannel').subscribe().messages()[0].examples()[0].headers['some-common-header']).to.equal('My header');
});

it('should fail on invalid examples', async function() {
  const expectedErrorObject = {
    type: 'https://github.com/asyncapi/parser-js/validation-errors',
    title: 'There were errors validating the AsyncAPI document.',
  };

  await checkErrorWrapper(async () => {
    await parser.parse(fs.readFileSync(path.resolve(__dirname, './wrong/invalid-asyncapi-messages-example.yml'), 'utf8'), { path: __filename });
  }, expectedErrorObject);
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

  it('should show that for 2.0 default schema format is 2.0 and for 2.1 it is 2.1', async function() {
    const result20 = await parser.parse(inputYAML, { path: __filename });
    const result21 = await parser.parse(fs.readFileSync(path.resolve(__dirname, './good/asyncapi-messages-example.yml'), 'utf8'), { path: __filename });

    expect(result20.channel('mychannel').publish().messages()[0].schemaFormat()).to.equal('application/vnd.aai.asyncapi;version=2.0.0');
    expect(result21.channel('myChannel').subscribe().messages()[0].schemaFormat()).to.equal('application/vnd.aai.asyncapi;version=2.1.0');
  });
});
