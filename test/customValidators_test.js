const {
  validateServerVariables,
  validateOperationId,
  validateServerSecurity,
  validateChannels,
} = require('../lib/customValidators.js');
const { checkErrorWrapper } = require('./testsUtils');

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

    expect(validateServerVariables(parsedInput, inputString, input)).to.equal(
      true
    );
  });

  it('should successfully validate if server object not provided', async function () {
    const inputString = '{}';
    const parsedInput = JSON.parse(inputString);

    expect(validateServerVariables(parsedInput, inputString, input)).to.equal(
      true
    );
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Not all server variables are described with variable object',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'dummy server does not have a corresponding variable object for: host',
          location: {
            jsonPointer: '/servers/dummy',
            startLine: 3,
            startColumn: 19,
            startOffset: 39,
            endLine: 10,
            endColumn: 11,
            endOffset: 196,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateServerVariables(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Not all server variables are described with variable object',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'dummy server does not have a corresponding variable object for: host,port',
          location: {
            jsonPointer: '/servers/dummy',
            startLine: 3,
            startColumn: 19,
            startOffset: 39,
            endLine: 5,
            endColumn: 11,
            endOffset: 89,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateServerVariables(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Not all server variables are described with variable object',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'dummy server does not have a corresponding variable object for: port',
          location: {
            jsonPointer: '/servers/dummy',
            startLine: 3,
            startColumn: 19,
            startOffset: 39,
            endLine: 10,
            endColumn: 11,
            endOffset: 200,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateServerVariables(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    expect(() =>
      validateServerVariables(parsedInput, inputString, input)
    ).to.throw('Not all server variables are described with variable object');
  });

  // server with a variable that has enum and an example match one of them
  it('should successfully validate the server variables that has enum and an example match one of them', async function () {
    const inputString = `{ 
        "servers": {
          "dummy": {
            "url": "http://localhost:{port}",
            "description": "The production API server",
            "protocol": "secure-mqtt",
            "variables": {
              "port": {
                "enum": ["8883", "8884"],
                "default": "8883",
                "examples" : ["8883"]
              }
            }
          }
        }
     }`;

    const parsedInput = JSON.parse(inputString);

    expect(validateServerVariables(parsedInput, inputString, input)).to.equal(
      true
    );
  });

  // server with a variable that  has only default and example, no enum
  it('should successfully validate the server variables has only default and example, no enum', async function () {
    const inputString = `{ 
      "servers": {
        "dummy":
        {
          "url": "http://localhost:{port}",
          "description": "The production API server",
          "protocol": "secure-mqtt",
          "variables": {
            "port": {
              "default": "8883",
              "examples" : ["8883"]
            }
          }
        }
      }
    }`;

    const parsedInput = JSON.parse(inputString);

    expect(validateServerVariables(parsedInput, inputString, input)).to.equal(
      true
    );
  });

  // server with a variable that has one example and it doesn't match any of provided enum
  it('should throw error on the server variables has one example and it does not match any of provided enum', async function () {
    const inputString = `{ 
      "servers": {
        "dummy":
        {
          "url": "http://localhost:{port}",
          "description": "The production API server",
          "protocol": "secure-mqtt",
          "variables": {
            "port": {
              "enum": ["8883", "8884"],
              "examples" : ["8882"]
            }
          }
        }
      }
    }`;

    const parsedInput = JSON.parse(inputString);

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Check your server variables. The example does not match the enum list',
    };

    checkErrorWrapper(() => {
      validateServerVariables(parsedInput, inputString, input);
    } ,expectedErrorObject);
  });

  // server with a variable that has more than one example and only one of them match enum list,
  // but the rest don't,
  // so validation should fail with clear information which example is wrong and where in the file is it
  it('should throw error on the server variables that has wrong examples but not on the ones that have correct examples', async function () {
    const inputString = `{ 
      "servers": {
        "dummy":
        {
          "url": "{protocol}://localhost:{port}/{basePath}",
          "description": "The production API server",
          "protocol": "secure-mqtt",
          "variables": {
            "protocol": {
              "enum": ["http", "https"],
              "examples" : ["http"],
              "default": "https"
            },
            "port": {
              "enum": ["8883", "8884"],
              "examples" : ["8883", "8885", "8887"],
              "default": "8883"
            },
            "basePath": {
              "enum": ["v1", "v2", "v3"],
              "examples" : ["v4"],
              "default": "v2"
            }
          }
        }
      }
    }`;

    const parsedInput = JSON.parse(inputString);

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title:
        'Check your server variables. The example does not match the enum list',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'dummy/variables/port server variable provides an example that does not match the enum list: 8885,8887',
          location: {
            jsonPointer: '/servers/dummy/variables/port',
            startLine: 14,
            startColumn: 22,
            startOffset: 398,
            endLine: 18,
            endColumn: 15,
            endOffset: 538,
          },
        },
        {
          title:
            'dummy/variables/basePath server variable provides an example that does not match the enum list: v4',
          location: {
            jsonPointer: '/servers/dummy/variables/basePath',
            startLine: 19,
            startColumn: 26,
            startOffset: 564,
            endLine: 23,
            endColumn: 15,
            endOffset: 686,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateServerVariables(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'test/{test}/{testid} channel does not have a corresponding parameter object for: testid',
          location: {
            jsonPointer: '/channels/test~1{test}~1{testid}',
            startLine: 3,
            startColumn: 34,
            startOffset: 54,
            endLine: 11,
            endColumn: 11,
            endOffset: 214,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'test/{test} channel does not have a corresponding parameter object for: test',
          location: {
            jsonPointer: '/channels/test~1{test}',
            startLine: 3,
            startColumn: 25,
            startOffset: 45,
            endLine: 11,
            endColumn: 11,
            endOffset: 206,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
  });

  it('should throw error when there are no parameter objects', async function () {
    const inputString = `{
      "channels": {
        "test/{test}/{testid}": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'test/{test}/{testid} channel does not have a corresponding parameter object for: test,testid',
          location: {
            jsonPointer: '/channels/test~1{test}~1{testid}',
            startLine: 3,
            startColumn: 34,
            startOffset: 54,
            endLine: 4,
            endColumn: 11,
            endOffset: 65,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
  });

  it('should throw error', async function () {
    const inputString = `{
      "channels": {
        "test/{test}/{testid}": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    checkErrorWrapper(() => {
      validateChannels(parsedInput, inputString, input);
    }, 'Channel validation failed');
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            '/user/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 11,
            endLine: 4,
            endOffset: 65,
            jsonPointer: '/channels/~1user~1signedup?foo=1',
            startColumn: 34,
            startLine: 3,
            startOffset: 54,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
  });

  it('should throw error that the provided channel name is invalid when channel name is just a single slash (/)', async function () {
    const inputString = `{
      "channels": {
        "/?foo=1": {
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            '/?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 11,
            endLine: 4,
            endOffset: 52,
            jsonPointer: '/channels/~1?foo=1',
            startColumn: 21,
            startLine: 3,
            startOffset: 41,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
  });

  it('should throw error that channel has invalid name with two query params', async function () {
    const inputString = `{
    "channels": {
      "/user/signedup?foo=1&bar=0": {
      }
    }
  }`;
    const parsedInput = JSON.parse(inputString);

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            '/user/signedup?foo=1&bar=0 channel contains invalid name with url query parameters: ?foo=1&bar=0',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 65,
            jsonPointer: '/channels/~1user~1signedup?foo=1&bar=0',
            startColumn: 38,
            startLine: 3,
            startOffset: 56,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            '/user/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 59,
            jsonPointer: '/channels/~1user~1signedup?foo=1',
            startColumn: 32,
            startLine: 3,
            startOffset: 50,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            '/user/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 59,
            jsonPointer: '/channels/~1user~1signedup?foo=1',
            startColumn: 32,
            startLine: 3,
            startOffset: 50,
          },
        },
        {
          title:
            '/user/login?bar=2 channel contains invalid name with url query parameters: ?bar=2',
          location: {
            endColumn: 9,
            endLine: 6,
            endOffset: 96,
            jsonPointer: '/channels/~1user~1login?bar=2',
            startColumn: 28,
            startLine: 5,
            startOffset: 87,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
  });

  it('should throw error that single channel definition failed both validations', async function () {
    const inputString = `{
    "channels": {
      "user/{userId}/signedup?foo=1": {
      }
    }
  }`;
    const parsedInput = JSON.parse(inputString);

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'user/{userId}/signedup?foo=1 channel does not have a corresponding parameter object for: userId',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 67,
            jsonPointer: '/channels/user~1{userId}~1signedup?foo=1',
            startColumn: 40,
            startLine: 3,
            startOffset: 58,
          },
        },
        {
          title:
            'user/{userId}/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 67,
            jsonPointer: '/channels/user~1{userId}~1signedup?foo=1',
            startColumn: 40,
            startLine: 3,
            startOffset: 58,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'Channel validation failed',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'test/{test} channel does not have a corresponding parameter object for: test',
          location: {
            endColumn: 9,
            endLine: 6,
            endOffset: 90,
            jsonPointer: '/channels/test~1{test}',
            startColumn: 22,
            startLine: 5,
            startOffset: 81,
          },
        },
        {
          title:
            '/user/signedup?foo=1 channel contains invalid name with url query parameters: ?foo=1',
          location: {
            endColumn: 9,
            endLine: 4,
            endOffset: 59,
            jsonPointer: '/channels/~1user~1signedup?foo=1',
            startColumn: 32,
            startLine: 3,
            startOffset: 50,
          },
        },
      ]
    };

    checkErrorWrapper(() => {
      validateChannels(parsedInput, inputString, input);
    }, expectedErrorObject);
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

    expect(
      validateOperationId(parsedInput, inputString, input, operations)
    ).to.equal(true);
  });

  it('should successfully validate if channel object not provided', function () {
    const inputString = '{}';
    const parsedInput = JSON.parse(inputString);

    expect(
      validateOperationId(parsedInput, inputString, input, operations)
    ).to.equal(true);
  });

  it('should throw error that operationIds are duplicated and that they duplicate', async function () {
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title: 'operationId must be unique across all the operations.',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'test/2/subscribe/operationId is a duplicate of: test/1/publish/operationId',
          location: {
            jsonPointer: '/channels/test~12/subscribe/operationId',
            startLine: 14,
            startColumn: 29,
            startOffset: 273,
            endLine: 14,
            endColumn: 35,
            endOffset: 279,
          },
        },
        {
          title:
            'test/3/subscribe/operationId is a duplicate of: test/1/publish/operationId',
          location: {
            jsonPointer: '/channels/test~13/subscribe/operationId',
            startLine: 19,
            startColumn: 29,
            startOffset: 375,
            endLine: 19,
            endColumn: 35,
            endOffset: 381,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateOperationId(parsedInput, inputString, input, operations);
    }, expectedErrorObject);
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

    expect(
      validateServerSecurity(parsedInput, inputString, input, specialSecTypes)
    ).to.equal(true);
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

    expect(
      validateServerSecurity(parsedInput, inputString, input, specialSecTypes)
    ).to.equal(true);
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

    expect(
      validateServerSecurity(parsedInput, inputString, input, specialSecTypes)
    ).to.equal(true);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title:
        'Server security name must correspond to a security scheme which is declared in the security schemes under the components object.',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'dummy/security/complex doesn\'t have a corresponding security schema under the components object',
          location: {
            jsonPointer: '/servers/dummy/security/complex',
            startLine: 12,
            startColumn: 27,
            startOffset: 250,
            endLine: 12,
            endColumn: 29,
            endOffset: 252,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateServerSecurity(parsedInput, inputString, input, specialSecTypes);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title:
        'Server security name must correspond to a security scheme which is declared in the security schemes under the components object.',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'dummy/security/complex doesn\'t have a corresponding security schema under the components object',
          location: {
            jsonPointer: '/servers/dummy/security/complex',
            startLine: 12,
            startColumn: 27,
            startOffset: 250,
            endLine: 12,
            endColumn: 29,
            endOffset: 252,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateServerSecurity(parsedInput, inputString, input, specialSecTypes);
    }, expectedErrorObject);
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

    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/validation-errors',
      title:
        'Server security value must be an empty array if corresponding security schema type is not oauth2 or openIdConnect.',
      parsedJSON: parsedInput,
      validationErrors: [
        {
          title:
            'dummy/security/basic security info must have an empty array because its corresponding security schema type is: userPassword',
          location: {
            jsonPointer: '/servers/dummy/security/basic',
            startLine: 12,
            startColumn: 25,
            startOffset: 248,
            endLine: 12,
            endColumn: 45,
            endOffset: 268,
          },
        },
        {
          title:
            'dummy/security/apikey security info must have an empty array because its corresponding security schema type is: httpApiKey',
          location: {
            jsonPointer: '/servers/dummy/security/apikey',
            startLine: 15,
            startColumn: 26,
            startOffset: 322,
            endLine: 15,
            endColumn: 36,
            endOffset: 332,
          },
        },
      ],
    };

    await checkErrorWrapper(async () => {
      await validateServerSecurity(parsedInput, inputString, input, specialSecTypes);
    }, expectedErrorObject);
  });
});
