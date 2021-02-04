const { validateServerVariables, validateOperationId, validateServerSecurity, validateChannels } = require('../lib/customValidators.js');
const chai = require('chai');

const expect = chai.expect;
const input = 'json';

describe('validateServerVariables()', function () {
  it('should successfully validate the server variables', async function () {
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

  it('should successfully validate if server object not provided', async function () {
    const inputString = '{}';
    const parsedInput = JSON.parse(inputString);

    expect(validateServerVariables(parsedInput, inputString, input)).to.equal(true);
  });

  it('should throw error that one of variables is not provided', async function () {
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
            endOffset: 196,
          }
        }
      ]);
    }
  });

  it('should throw error that variables are not provided if there is no variables object', async function () {
    const inputString = `{ 
      "servers": {
        "dummy": {
          "url": "http://{host}{port}"
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
          title: 'dummy server does not have a corresponding variable object for: host,port',
          location: {
            jsonPointer: '/servers/dummy',
            startLine: 3,
            startColumn: 19,
            startOffset: 39,
            endLine: 5,
            endColumn: 11,
            endOffset: 89,
          }
        }
      ]);
    }
  });

  it('should throw error that variables are not provided even if they are but not matching the name', async function () {
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
            endOffset: 200,
          }
        }
      ]);
    }
  });

  it('should throw error', async function () {
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
});

describe('validateChannel()', function () {
  it('should successfully validate if channel object not provided', async function () {
    const inputDoc = {};

    expect(validateChannels(inputDoc, input)).to.equal(true);
  });

  it('should successfully validate channel param', async function () {
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

    expect(validateChannels(parsedInput, inputString, input)).to.equal(true);
  });

  it('should successfully validate channel param for 2 channels', async function () {
    const inputString = `{
      "channels": {
        "test/{test01}": {
          "parameters": {
            "test01": {
              "schema": {
                "type": "string"
              }
            }
          }
        },
        "test/{test02}": {
          "parameters": {
            "test02": {
              "schema": {
                "type": "string"
              }
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(validateChannels(parsedInput, inputString, input)).to.equal(true);
  });

  it('should throw error that one of provided channel params is not declared', async function () {
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
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
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

  it('should throw error that one of provided channel params is not declared even if other not provided params have a corresponding parameter object', async function () {
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
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
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

  it('should throw error when there are no parameter objects', async function () {
    const inputString = `{
      "channels": {
        "test/{test}/{testid}": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
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

  it('should throw error', async function () {
    const inputString = `{
      "channels": {
        "test/{test}/{testid}": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(() => validateChannels(parsedInput, inputString, input)).to.throw('Channel validation failed');
  });

  it('should successfully validate channel name without variable', async function () {
    const inputString = `{
      "channels": {
        "test/test01": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(validateChannels(parsedInput, inputString, input)).to.equal(true);
  });

  it('should successfully validate channel name is just a single slash (/)', async function () {
    const inputString = `{
      "channels": {
        "/": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(validateChannels(parsedInput, inputString, input)).to.equal(true);
  });

  it('should throw error that the provided channel name is invalid', async function () {
    const inputString = `{
      "channels": {
        "/user/signedup?foo=1": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: '/user/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 11,
            endLine: 4,
            endOffset: 65,
            jsonPointer: '/channels/~1user~1signedup?foo=1',
            startColumn: 34,
            startLine: 3,
            startOffset: 54
          }
        }
      ]);
    }
  });

  it('should throw error that the provided channel name is invalid when channel name is just a single slash (/)', async function () {
    const inputString = `{
      "channels": {
        "/?foo=1": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: '/?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 11,
            endLine: 4,
            endOffset: 52,
            jsonPointer: '/channels/~1?foo=1',
            startColumn: 21,
            startLine: 3,
            startOffset: 41
          }
        }
      ]);
    }
  });

  it('should throw error that channel has invalid name with two query params', async function () {
    const inputString = `{
    "channels": {
      "/user/signedup?foo=1&bar=0": {
      }
    }
  }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: '/user/signedup?foo=1&bar=0 channel contains invalid name with url query parameters: ?foo=1&bar=0',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 65,
            jsonPointer: '/channels/~1user~1signedup?foo=1&bar=0',
            startColumn: 38,
            startLine: 3,
            startOffset: 56
          }
        }
      ]);
    }
  });

  it('should throw error that one of the provided channel name is invalid', async function () {
    const inputString = `{
    "channels": {
      "/user/signedup?foo=1": {
      },
	  "/user/login": {
      }
    }
  }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: '/user/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 59,
            jsonPointer: '/channels/~1user~1signedup?foo=1',
            startColumn: 32,
            startLine: 3,
            startOffset: 50
          }
        }
      ]);
    }
  });

  it('should throw error that both provided channel name is invalid', async function () {
    const inputString = `{
    "channels": {
      "/user/signedup?foo=1": {
      },
	    "/user/login?bar=2": {
      }
    }
  }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: '/user/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 59,
            jsonPointer: '/channels/~1user~1signedup?foo=1',
            startColumn: 32,
            startLine: 3,
            startOffset: 50
          }
        },
        {
          title: '/user/login?bar=2 channel contains invalid name with url query parameters: ?bar=2',
          location: {
            endColumn: 9,
            endLine: 6,
            endOffset: 96,
            jsonPointer: '/channels/~1user~1login?bar=2',
            startColumn: 28,
            startLine: 5,
            startOffset: 87
          }
        }
      ]);
    }
  });

  it('should throw error that single channel definition failed both validations', async function () {
    const inputString = `{
    "channels": {
      "user/{userId}/signedup?foo=1": {
      }
    }
  }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'user/{userId}/signedup?foo=1 channel does not have a corresponding parameter object for: userId',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 67,
            jsonPointer: '/channels/user~1{userId}~1signedup?foo=1',
            startColumn: 40,
            startLine: 3,
            startOffset: 58
          }
        },
        {
          title: 'user/{userId}/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 67,
            jsonPointer: '/channels/user~1{userId}~1signedup?foo=1',
            startColumn: 40,
            startLine: 3,
            startOffset: 58
          }
        }
      ]);
    }
  });

  it('should throw error that both provided channels contain errors', async function () {
    const inputString = `{
    "channels": {
      "/user/signedup?foo=1": {
      },
	    "test/{test}": {
      }
    }
  }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateChannels(parsedInput, inputString, input);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channel validation failed');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'test/{test} channel does not have a corresponding parameter object for: test',
          location: {
            endColumn: 9,
            endLine: 6,
            endOffset: 90,
            jsonPointer: '/channels/test~1{test}',
            startColumn: 22,
            startLine: 5,
            startOffset: 81
          }
        },
        {
          title: '/user/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 59,
            jsonPointer: '/channels/~1user~1signedup?foo=1',
            startColumn: 32,
            startLine: 3,
            startOffset: 50
          }
        }
      ]);
    }
  });
});
describe('validateOperationId()', function () {
  const operations = ['subscribe', 'publish'];

  it('should successfully validate operationId', async function () {
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

  it('should successfully validate if channel object not provided', function () {
    const inputString = '{}';
    const parsedInput = JSON.parse(inputString);

    expect(validateOperationId(parsedInput, inputString, input, operations)).to.equal(true);
  });

  it('should throw error that operationIds are duplicated and that they duplicate', function () {
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

describe('validateServerSecurity()', function () {
  const specialSecTypes = ['oauth2', 'openIdConnect'];

  it('should successfully validate server security', async function () {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
        "version": "1.0.0"
      },
      "servers": {
        "dummy": {
          "url": "http://localhost",
          "protocol": "kafka",
          "security": [
            {
              "simple": []
            }
          ]
        }
      },
      "components": {
        "securitySchemes": {
          "simple": {
            "type": "httpApiKey",
            "name": "Api-Key",
            "in": "header"
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(validateServerSecurity(parsedInput, inputString, input, specialSecTypes)).to.equal(true);
  });

  it('should successfully validate if server security not provided', async function () {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
        "version": "1.0.0"
      },
      "servers": {
        "dummy": {
          "url": "http://localhost",
          "protocol": "kafka"
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(validateServerSecurity(parsedInput, inputString, input, specialSecTypes)).to.equal(true);
  });

  it('should successfully validate server security of special security type like oauth2', async function () {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
        "version": "1.0.0"
      },
      "servers": {
        "dummy": {
          "url": "http://localhost",
          "protocol": "kafka",
          "security": [
            {
              "oauth2": [
                "write:test",
                "read:test"
              ]
            }
          ]
        }
      },
      "components": {
        "securitySchemes": {
          "oauth2": {
            "type": "oauth2",
            "flows": {}
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(validateServerSecurity(parsedInput, inputString, input, specialSecTypes)).to.equal(true);
  });

  it('should throw error that server has no security schema provided when components schema object is there but missing proper values', async function () {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
        "version": "1.0.0"
      },
      "servers": {
        "dummy": {
          "url": "http://localhost",
          "protocol": "kafka",
          "security": [
            {
              "complex": []
            }
          ]
        }
      },
      "components": {
        "securitySchemes": {
          "simple": {
            "type": "httpApiKey",
            "name": "Api-Key",
            "in": "header"
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateServerSecurity(parsedInput, inputString, input, specialSecTypes);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Server security name must correspond to a security scheme which is declared in the security schemes under the components object.');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'dummy/security/complex doesn\'t have a corresponding security schema under the components object',
          location: {
            jsonPointer: '/servers/dummy/security/complex',
            startLine: 12,
            startColumn: 27,
            startOffset: 250,
            endLine: 12,
            endColumn: 29,
            endOffset: 252
          }
        }
      ]);
    }
  });

  it('should throw error that server has no security schema provided when components schema object is not in the document', async function () {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
        "version": "1.0.0"
      },
      "servers": {
        "dummy": {
          "url": "http://localhost",
          "protocol": "kafka",
          "security": [
            {
              "complex": []
            }
          ]
        }
      },
      "components": {
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateServerSecurity(parsedInput, inputString, input, specialSecTypes);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Server security name must correspond to a security scheme which is declared in the security schemes under the components object.');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'dummy/security/complex doesn\'t have a corresponding security schema under the components object',
          location: {
            jsonPointer: '/servers/dummy/security/complex',
            startLine: 12,
            startColumn: 27,
            startOffset: 250,
            endLine: 12,
            endColumn: 29,
            endOffset: 252
          }
        }
      ]);
    }
  });

  it('should throw error that server security is not declared as empty array', async function () {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
        "version": "1.0.0"
      },
      "servers": {
        "dummy": {
          "url": "http://localhost",
          "protocol": "kafka",
          "security": [
            {
              "basic": ["user", "password"]
            },
            {
              "apikey": [12345678]
            }
          ]
        }
      },
      "components": {
        "securitySchemes": {
          "basic": {
            "type": "userPassword"
          },
          "apikey": {
            "type": "httpApiKey"
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    try {
      validateServerSecurity(parsedInput, inputString, input, specialSecTypes);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Server security value must be an empty array if corresponding security schema type is not oauth2 or openIdConnect.');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'dummy/security/basic security info must have an empty array because its corresponding security schema type is: userPassword',
          location: {
            jsonPointer: '/servers/dummy/security/basic',
            startLine: 12,
            startColumn: 25,
            startOffset: 248,
            endLine: 12,
            endColumn: 45,
            endOffset: 268
          }
        },
        {
          title: 'dummy/security/apikey security info must have an empty array because its corresponding security schema type is: httpApiKey',
          location: {
            jsonPointer: '/servers/dummy/security/apikey',
            startLine: 15,
            startColumn: 26,
            startOffset: 322,
            endLine: 15,
            endColumn: 36,
            endOffset: 332
          }
        }
      ]);
    }
  });
}
);