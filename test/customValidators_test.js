const { validateChannelParams, validateServerVariables, validateOperationId, validateServerSecurity } = require('../lib/customValidators.js');
const chai = require('chai');
const { offset } = require('../lib/utils'); 

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
            startOffset: offset(39, 3),
            endLine: 10,
            endColumn: 11,
            endOffset: offset(196, 10),
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
            startOffset: offset(39, 3),
            endLine: 5,
            endColumn: 11,
            endOffset: offset(89, 5),
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
            startOffset: offset(39, 3),
            endLine: 10,
            endColumn: 11,
            endOffset: offset(200, 10),
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
            startOffset: offset(54, 3),
            endLine: 11,
            endColumn: 11,
            endOffset: offset(214, 11)
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
            startOffset: offset(45, 3),
            endLine: 11,
            endColumn: 11,
            endOffset: offset(206, 11)
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
            startOffset: offset(54, 3),
            endLine: 4,
            endColumn: 11,
            endOffset: offset(65, 4)
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
            startOffset: offset(273, 14),
            endLine: 14,
            endColumn: 35,
            endOffset: offset(279, 14)
          }
        },
        {
          title: 'test/3/subscribe/operationId is a duplicate of: test/1/publish/operationId',
          location: {
            jsonPointer: '/channels/test~13/subscribe/operationId',
            startLine: 19,
            startColumn: 29,
            startOffset: offset(375, 19),
            endLine: 19,
            endColumn: 35,
            endOffset: offset(381, 19)
          }
        }
      ]);
    }
  });
});

describe('validateServerSecurity()', function() {
  const specialSecTypes = ['oauth2', 'openIdConnect'];

  it('should successfully validate server security', async function() {
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

  it('should successfully validate server security for oauth2 that requires scopes', async function() {
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
              "oauthsec": ["read:pets"]
            }
          ]
        }
      },
      "components": {
        "securitySchemes": {
          "oauthsec": {
            "type": "oauth2",
            "flows": {
              "implicit": {
                "authorizationUrl": "https://example.com/api/oauth/auth",
                "refreshUrl": "https://example.com/api/oauth/refresh",
                "scopes": {
                  "write:pets": "modify pets in your account",
                  "read:pets": "read your pets"
                }
              }
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);
    
    expect(validateServerSecurity(parsedInput, inputString, input, specialSecTypes)).to.equal(true);
  });

  it('should successfully validate if server security not provided', async function() {
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

  it('should successfully validate server security of special security type like oauth2', async function() {
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

  it('should throw error that server has no security schema provided when components schema object is there but missing proper values', async function() {
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
            startOffset: offset(250, 12),
            endLine: 12,
            endColumn: 29,
            endOffset: offset(252, 12)
          }
        }
      ]);
    }
  });

  it('should throw error that server security is missing scopes that are required for special security types like oauth2 and openIdConnect', async function() {
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
              "oauthsec": []
            }
          ]
        }
      },
      "components": {
        "securitySchemes": {
          "oauthsec": {
            "type": "oauth2",
            "flows": {
              "implicit": {
                "authorizationUrl": "https://example.com/api/oauth/auth",
                "refreshUrl": "https://example.com/api/oauth/refresh",
                "scopes": {
                  "write:pets": "modify pets in your account",
                  "read:pets": "read your pets"
                }
              }
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);
    
    try {
      validateServerSecurity(parsedInput, inputString, input, specialSecTypes);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Server security value must not be an empty array if corresponding security schema type is oauth2 or openIdConnect. Add list of required scopes.');
      expect(e.parsedJSON).to.deep.equal(parsedInput);
      expect(e.validationErrors).to.deep.equal([
        {
          title: 'dummy/security/oauthsec security info must not have an empty array because its corresponding security schema type is: oauth2',
          location: {
            jsonPointer: '/servers/dummy/security/oauthsec',
            startLine: 12,
            startColumn: 28,
            startOffset: offset(251, 12),
            endLine: 12,
            endColumn: 30,
            endOffset: offset(253, 12)
          }
        }
      ]);
    }
  });

  it('should throw error that server has no security schema provided when components schema object is not in the document', async function() {
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
            startOffset: offset(250, 12),
            endLine: 12,
            endColumn: 29,
            endOffset: offset(252, 12)
          }
        }
      ]);
    }  
  });

  it('should throw error that server security is not declared as empty array', async function() {
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
            startOffset: offset(248, 12),
            endLine: 12,
            endColumn: 45,
            endOffset: offset(268, 12)
          }
        },
        {
          title: 'dummy/security/apikey security info must have an empty array because its corresponding security schema type is: httpApiKey',
          location: {
            jsonPointer: '/servers/dummy/security/apikey',
            startLine: 15,
            startColumn: 26,
            startOffset: offset(322, 15),
            endLine: 15,
            endColumn: 36,
            endOffset: offset(332, 15)
          }
        }
      ]);
    }  
  });
});