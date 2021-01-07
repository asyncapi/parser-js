const ERROR_URL_PREFIX = 'https://github.com/asyncapi/parser-js/';

const buildError = (from, to) => {
  to.type = from.type.startsWith(ERROR_URL_PREFIX) ? from.type : `${ERROR_URL_PREFIX}${from.type}`;
  to.title = from.title;
  if (from.detail) to.detail = from.detail;
  if (from.validationErrors) to.validationErrors = from.validationErrors;
  if (from.parsedJSON) to.parsedJSON = from.parsedJSON;
  if (from.location) to.location = from.location;
  if (from.refs) to.refs = from.refs;
  return to;
};

/**
 * Represents an error while trying to parse an AsyncAPI document.
 * 
 * @alias module:@asyncapi/parser#ParserError
 * @augments Error
 */
class ParserError extends Error {
  /**
   * Instantiates an error
   * 
   * @param {object} definition
   * @param {string} definition.type The type of the error.
   * @param {string} definition.title The message of the error.
   * @param {string} [definition.detail] A string containing more detailed information about the error.
   * @param {object} [definition.parsedJSON] The resulting JSON after YAML transformation. Or the JSON object if the this was the initial format.
   * @param {object[]} [definition.validationErrors] The errors resulting from the validation. For more information, see https://www.npmjs.com/package/better-ajv-errors.
   * @param {string} definition.validationErrors.title A validation error message.
   * @param {string} definition.validationErrors.jsonPointer The path to the field that contains the error. Uses JSON Pointer format.
   * @param {number} definition.validationErrors.startLine The line where the error starts in the AsyncAPI document.
   * @param {number} definition.validationErrors.startColumn The column where the error starts in the AsyncAPI document.
   * @param {number} definition.validationErrors.startOffset The offset (starting from the beginning of the document) where the error starts in the AsyncAPI document.
   * @param {number} definition.validationErrors.endLine The line where the error ends in the AsyncAPI document.
   * @param {number} definition.validationErrors.endColumn The column where the error ends in the AsyncAPI document.
   * @param {number} definition.validationErrors.endOffset The offset (starting from the beginning of the document) where the error ends in the AsyncAPI document.
   * @param {object} [definition.location] Error location details after trying to parse an invalid JSON or YAML document.
   * @param {number} definition.location.startLine The line of the YAML/JSON document where the error starts.
   * @param {number} definition.location.startColumn The column of the YAML/JSON document where the error starts.
   * @param {number} definition.location.startOffset The offset (starting from the beginning of the document) where the error starts in the YAML/JSON AsyncAPI document.
   * @param {object[]} [definition.refs] Error details after trying to resolve $ref's.
   * @param {string} definition.refs.title A validation error message.
   * @param {string} definition.refs.jsonPointer The path to the field that contains the error. Uses JSON Pointer format.
   * @param {number} definition.refs.startLine The line where the error starts in the AsyncAPI document.
   * @param {number} definition.refs.startColumn The column where the error starts in the AsyncAPI document.
   * @param {number} definition.refs.startOffset The offset (starting from the beginning of the document) where the error starts in the AsyncAPI document.
   * @param {number} definition.refs.endLine The line where the error ends in the AsyncAPI document.
   * @param {number} definition.refs.endColumn The column where the error ends in the AsyncAPI document.
   * @param {number} definition.refs.endOffset The offset (starting from the beginning of the document) where the error ends in the AsyncAPI document.
   */
  constructor(definition) {
    super();
    buildError(definition, this);
    this.message = definition.title;
  }

  /**
   * @returns {object} Returns a JS object representation of the error.
   */
  toJS() {
    return buildError(this, {});
  }
}

module.exports = ParserError;
