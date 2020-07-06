const {validateChannelParams, validateServerVariables, validateOperationId} = require('../lib/customValidators.js');
const chai = require('chai');

const expect = chai.expect;
const input = 'json';

describe('validateServerVariables()', function() {
  it('should successfully validate the server variables', async function() {
    const inputString = `{ 
      "servers": {
        "dummy": {
          "url": "http://localhost:{port}",
          "variables": {
            "port": { 
              "default": "3000"
            }
          }
            
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);
    
    expect(validateServerVariables(parsedInput, inputString, input)).to.equal(true);
  });

  it('should successfully validate if server object not provided', async function() {
    const inputString = '{}';
    const parsedInput = JSON.parse(inputString);
    
    expect(validateServerVariables(parsedInput, inputString, input)).to.equal(true);
  });

  it('should throw error that one of variables is not provided', async function() {
    const inputString = `{ 
      "servers": {
        "dummy": {
          "url": "http://{host}{port}",
          "variables": {
            "port": { 
              "default": "3000"
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateServerVariables(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Not all server variables are described with variable object');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'dummy server does not have a corresponding variable object for: host',
          location: {
            jsonPointer: '/servers/dummy',
            startLine: 3,
            startColumn: 19,
            startOffset: 39,
            endLine: 10,
            endColumn: 11,
            endOffset: 196
          }
        }
      ]);
    }
  });

  it('should throw error that variables are not provided if there is no variables object', async function() {
    const inputString = `{ 
      "servers": {
        "dummy": {
          "url": "http://{host}{port}"
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);
    
    try {
      validateServerVariables(parsedInput, inputString,  input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Not all server variables are described with variable object');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'dummy server does not have a corresponding variable object for: host,port',
          location: {
            jsonPointer: '/servers/dummy',
            startLine: 3,
            startColumn: 19,
            startOffset: 39,
            endLine: 5,
            endColumn: 11,
            endOffset: 89
          }
        }
      ]);
    }
  });

  it('should throw error that variables are not provided even if they are but not matching the name', async function() {
    const inputString = `{ 
      "servers": {
        "dummy": {
          "url": "http://localhost{port}",
          "variables": {
            "ports": { 
              "default": "3000"
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateServerVariables(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Not all server variables are described with variable object');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'dummy server does not have a corresponding variable object for: port',
          location: {
            jsonPointer: '/servers/dummy',
            startLine: 3,
            startColumn: 19,
            startOffset: 39,
            endLine: 10,
            endColumn: 11,
            endOffset: 200
          }
        }
      ]);
    }
  });
});

it('should throw error', async function() {
  const inputString = `{ 
    "servers": {
      "dummy": {
        "url": "http://{host}{port}"
      }
    }
  }`;
  const parsedInput = JSON.parse(inputString);

  expect(() => validateServerVariables(parsedInput, inputString, input)).to.throw('Not all server variables are described with variable object');
});
  
describe('validateChannelParams()', function() {
  it('should successfully validate if channel object not provided', async function() {
    const inputDoc = {};
    
    expect(validateChannelParams(inputDoc, input)).to.equal(true);
  });

  it('should successfully validate channel param', async function() {
    const inputString = `{
      "channels": {
        "test/{test}": {
          "parameters": {
            "test": {
              "schema": {
                "type": "string"
              }
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(validateChannelParams(parsedInput, inputString, input)).to.equal(true);
  });

  it('should throw error that one of provided channel params is not declared', async function() {
    const inputString = `{
      "channels": {
        "test/{test}/{testid}": {
          "parameters": {
            "test": {
              "schema": {
                "type": "string"
              }
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannelParams(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Not all channel parameters are described with parameter object');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'test/{test}/{testid} channel does not have a corresponding parameter object for: testid',
          location: {
            jsonPointer: '/channels/test~1{test}~1{testid}',
            startLine: 3,
            startColumn: 34,
            startOffset: 54,
            endLine: 11,
            endColumn: 11,
            endOffset: 214
          }
        }
      ]);
    }
  });

  it('should throw error that one of provided channel params is not declared even if other not provided params have a corresponding parameter object', async function() {
    const inputString = `{
      "channels": {
        "test/{test}": {
          "parameters": {
            "test1": {
              "schema": {
                "type": "string"
              }
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannelParams(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Not all channel parameters are described with parameter object');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'test/{test} channel does not have a corresponding parameter object for: test',
          location: {
            jsonPointer: '/channels/test~1{test}',
            startLine: 3,
            startColumn: 25,
            startOffset: 45,
            endLine: 11,
            endColumn: 11,
            endOffset: 206
          }
        }
      ]);
    }
  });

  it('should throw error when there are no parameter objects', async function() {
    const inputString = `{
      "channels": {
        "test/{test}/{testid}": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannelParams(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Not all channel parameters are described with parameter object');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'test/{test}/{testid} channel does not have a corresponding parameter object for: test,testid',
          location: {
            jsonPointer: '/channels/test~1{test}~1{testid}',
            startLine: 3,
            startColumn: 34,
            startOffset: 54,
            endLine: 4,
            endColumn: 11,
            endOffset: 65
          }
        }
      ]);
    }
  });

  it('should throw error', async function() {
    const inputString = `{
      "channels": {
        "test/{test}/{testid}": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(() => validateChannelParams(parsedInput, inputString, input)).to.throw('Not all channel parameters are described with parameter object');
  });
});

describe('validateOperationId()', function() {
  const operations = ['subscribe', 'publish'];

  it('should successfully validate operationId', async function() {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
        "version": "1.0.0"
      },
      "channels": {
        "test/1": {
          "publish": {
            "operationId": "test1"
          }
        },
        "test/2": {
          "subscribe": {
            "operationId": "test2"
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);
    
    expect(validateOperationId(parsedInput, inputString, input, operations)).to.equal(true);
  });

  it('should successfully validate if channel object not provided', function() {
    const inputString = '{}';
    const parsedInput = JSON.parse(inputString);
    
    expect(validateOperationId(parsedInput, inputString, input, operations)).to.equal(true);
  });

  it('should throw error that operationIds are duplicated and that they duplicate', function() {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
        "version": "1.0.0"
      },
      "channels": {
        "test/1": {
          "publish": {
            "operationId": "test"
          }
        },
        "test/2": {
          "subscribe": {
            "operationId": "test"
          }
        },
        "test/3": {
          "subscribe": {
            "operationId": "test"
          }
        },
        "test/4": {
          "subscribe": {
            "operationId": "test4"
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateOperationId(parsedInput, inputString, input, operations);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('operationId must be unique across all the operations.');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'test/2/subscribe/operationId is a duplicate of: test/1/publish/operationId',
          location: {
            jsonPointer: '/channels/test~12/subscribe/operationId',
            startLine: 14,
            startColumn: 29,
            startOffset: 273,
            endLine: 14,
            endColumn: 35,
            endOffset: 279
          }
        },
        {
          title: 'test/3/subscribe/operationId is a duplicate of: test/1/publish/operationId',
          location: {
            jsonPointer: '/channels/test~13/subscribe/operationId',
            startLine: 19,
            startColumn: 29,
            startOffset: 375,
            endLine: 19,
            endColumn: 35,
            endOffset: 381
          }
        }
      ]);
    }
  });
});