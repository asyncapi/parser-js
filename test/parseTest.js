// var assert = require('assert');
var expect = require('chai').expect;
var parser = require('../parser');
const fs = require('fs');
const path = require("path");

describe('parser()', function () {
    it('should parse yaml', function () {
        const yamlDoc = fs.readFileSync(path.resolve(__dirname, "./async.yaml"), 'utf8');
        var result = parser(yamlDoc);
        expect(result.hasErrors).to.equal(false);
    });
  });

  describe('parser()', function () {
    it('should parse json', function () {
        const jsonDoc = fs.readFileSync(path.resolve(__dirname, "./async.json"), 'utf8');
        var result = parser(jsonDoc);
        expect(result.hasErrors).to.equal(false);
    });
  });