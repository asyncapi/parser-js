const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const ParserError = require('../lib/errors/parser-error');

chai.use(chaiAsPromised);
const expect = chai.expect;

const testsUtils = module.exports;

/**
 * Tests helper for testing start and end offset position of error in file to make sure tests work on Windows too
 * 
 * @function offset
 * @private
 * @param  {Number} oset end or start offset number
 * @returns {Number} calculated offset number
 */
testsUtils.offset = (oset) => oset;

/* eslint-disable sonarjs/cognitive-complexity */
/**
 * Disabled the rule for this function as there is no way to make it shorter in a meaningfull way
 * This function should always be used in tests where errors are evaluated to make sure they always work even if proper error is not thrown
 * @private
 * @param  {Function} fn Function that you want to test
 * @param  {Object} validationObject Error object to evaluate against the error thrown by fn()
*/
testsUtils.checkErrorWrapper = async (fn, validationObject) => {
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
    if (parsedJSON) expect(e.parsedJSON).to.deep.equal(parsedJSON);
  }
};
