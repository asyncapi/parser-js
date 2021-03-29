const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const jsonParseBetterErrors = require('../lib/json-parse');
const { checkErrorWrapper } = require('./testsUtils');

chai.use(chaiAsPromised);

describe('jsonParseBetterErrors', function () {
  it('should throw error if passed value is an array', async function () {
    const expectedErrorObject = {
      message: 'Cannot parse an empty array',
    };
    await checkErrorWrapper(async () => {
      await jsonParseBetterErrors([]);
    }, expectedErrorObject);
  });

  it('should throw error if passed value is a Map', async function () {
    const expectedErrorObject = {
      message: 'Cannot parse [object Map]',
    };
    await checkErrorWrapper(async () => {
      await jsonParseBetterErrors(new Map());
    }, expectedErrorObject);
  });

  it('should throw error if passed value is a Set', async function () {
    const expectedErrorObject = {
      message: 'Cannot parse [object Set]',
    };

    await checkErrorWrapper(async () => {
      await jsonParseBetterErrors(new Set());
    }, expectedErrorObject);
  });

  it('should throw error if passed value is a WeakMap', async function () {
    const expectedErrorObject = {
      message: 'Cannot parse [object WeakMap]',
    };

    await checkErrorWrapper(async () => {
      await jsonParseBetterErrors(new WeakMap());
    }, expectedErrorObject);
  });

  it('should throw error if passed value is a WeakSet', async function () {
    const expectedErrorObject = {
      message: 'Cannot parse [object WeakSet]',
    };

    await checkErrorWrapper(async () => {
      await jsonParseBetterErrors(new WeakSet());
    }, expectedErrorObject);
  });

  it('should throw error if passed value is a Symbol', async function () {
    const expectedErrorObject = {
      message: 'Cannot parse Symbol(test)',
    };

    await checkErrorWrapper(async () => {
      await jsonParseBetterErrors(Symbol('test'));
    }, expectedErrorObject);
  });

  it('should throw error if passed value is a function', async function () {
    const expectedErrorObject = {
      message: 'Cannot parse () => {}',
    };

    await checkErrorWrapper(async () => {
      await jsonParseBetterErrors(() => {});
    }, expectedErrorObject);
  });
});
