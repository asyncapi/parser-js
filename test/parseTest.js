const expect = require('chai').expect;
const parser = require('../lib/parser');
const fs = require('fs');
const path = require("path");

const asyncapiYAML = '{"x-parser-messages":[{"message":{"payload":{"properties":{"name":{"type":"strin"}},"type":"object"}},"channelName":"mychannel","operationName":"publish"}],"asyncapi":"2.0.0","channels":{"mychannel":{"publish":{"message":{"payload":{"properties":{"name":{"type":"strin"}},"type":"object"}}}}},"id":"myapi","info":{"title":"My API","version":"1.0.0"}}';

describe('parse()', function () {
  it('should parse yaml', function () {
    const yamlDoc = fs.readFileSync(path.resolve(__dirname, "./asyncapi.yaml"), 'utf8');
    const result = parser(yamlDoc);
    expect(JSON.stringify(result)).to.equal(asyncapiYAML);
  });
});

//   describe('parser()', function () {
//     it('should parse json', function () {
//         const jsonDoc = fs.readFileSync(path.resolve(__dirname, "./asyncapi.json"), 'utf8');
//         const result = parser(jsonDoc);
//         expect(result.hasErrors).to.equal(false);
//     });
//   });