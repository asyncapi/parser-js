const {validateChannelParams, validateServerVariables} = require('../lib/customValidators.js');
const chai = require('chai');

const expect = chai.expect;

describe('validateServerVariables()', function() {
  it('should successfully validate the server variables', async function() {
    const inputDoc = { 
      servers: {
        dummy: {
          url: 'http://localhost:{port}',
          variables: {
            port: { 
              default: '3000'
            }
          }
            
        }
      }
    };
    
    expect(validateServerVariables(inputDoc)).to.equal(true);
  });

  it('should successfully validate if server object not provided', async function() {
    const inputDoc = {};
    
    expect(validateServerVariables(inputDoc)).to.equal(true);
  });

  it('should throw error that one of variables is not provided', async function() {
    const inputDoc = { 
      servers: {
        dummy: {
          url: 'http://{host}{port}',
          variables: {
            port: { 
              default: '3000'
            }
          }
        }
      }
    };
    
    try {
      validateServerVariables(inputDoc);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Server url has variables that are not described under variable object: host');
      expect(e.parsedJSON).to.equal(inputDoc);
    }
  });

  it('should throw error that variables are not provided if there is no variables object', async function() {
    const inputDoc = { 
      servers: {
        dummy: {
          url: 'http://{host}{port}'
        }
      }
    };
    
    try {
      validateServerVariables(inputDoc);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Server url has variables that are not described under variable object: host,port');
      expect(e.parsedJSON).to.equal(inputDoc);
    }
  });

  it('should throw error that variables are not provided even if they are but not matching the name', async function() {
    const inputDoc = { 
      servers: {
        dummy: {
          url: 'http://localhost{port}',
          variables: {
            ports: { 
              default: '3000'
            }
          }
        }
      }
    };
    
    try {
      validateServerVariables(inputDoc);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Server url has variables that are not described under variable object: port');
      expect(e.parsedJSON).to.equal(inputDoc);
    }
  });
});
  
describe('validateChannelParams()', function() {
  it('should successfully validate if channel object not provided', async function() {
    const inputDoc = {};
    
    expect(validateChannelParams(inputDoc)).to.equal(true);
  });

  it('should successfully validate channel param', async function() {
    const inputDoc = {
      channels: {
        'test/{test}': {
          parameters: {
            test: {
              schema: {
                type: 'string'
              }
            }
          }
        }
      }
    };
    
    expect(validateChannelParams(inputDoc)).to.equal(true);
  });

  it('should throw error that one of provided channel params is not declared', async function() {
    const inputDoc = {
      channels: {
        'test/{test}/{testid}': {
          parameters: {
            test: {
              schema: {
                type: 'string'
              }
            }
          }
        }
      }
    };
    try {
      validateChannelParams(inputDoc);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channels key has parameters specified that are not described with parameter object: testid');
      expect(e.parsedJSON).to.equal(inputDoc);
    }
  });

  it('should throw error that one of provided channel params is not declared even if other not provided params have a corresponding parameter object', async function() {
    const inputDoc = {
      channels: {
        'test/{test}': {
          parameters: {
            test1: {
              schema: {
                type: 'string'
              }
            }
          }
        }
      }
    };
    try {
      validateChannelParams(inputDoc);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channels key has parameters specified that are not described with parameter object: test');
      expect(e.parsedJSON).to.equal(inputDoc);
    }
  });

  it('should throw error when there are no parameter objects', async function() {
    const inputDoc = {
      channels: {
        'test/{test}/{testid}': {
        }
      }
    };
    try {
      validateChannelParams(inputDoc);
    } catch (e) {
      expect(e.type).to.equal('https://github.com/asyncapi/parser-js/validation-errors');
      expect(e.title).to.equal('Channels key has parameters specified that are not described with parameter object: test,testid');
      expect(e.parsedJSON).to.equal(inputDoc);
    }
  });
});