const { EOL } = require('os');
const eolLength = EOL.length;

const utils = module.exports;

/**
 * Tests helper for testing start and end offset position of error in file to make sure tests work on Windows too
 * 
 * @function offset
 * @private
 * @param {number} oset end or start offset number
 * @param {number} line end or start line number
 * @returns {number} calculated offset number
 */
utils.offset = (oset, line) => (oset + ((eolLength - 1) * (line - 1)));
