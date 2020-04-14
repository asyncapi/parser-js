/**
 * Represents an error while trying to parse an AsyncAPI document.
 */
class ParserError extends Error {
  /**
   * Instantiates an error
   * @param {Object} definition
   * @param {String} definition.type The type of the error.
   * @param {String} definition.title The message of the error.
   * @param {String} [definition.detail] A string containing more detailed information about the error.
   * @param {Object} [definition.parsedJSON] The resulting JSON after YAML transformation. Or the JSON object if the this was the initial format.
   * @param {Object[]} [definition.validationErrors] The errors resulting from the validation. For more information, see https://www.npmjs.com/package/better-ajv-errors.
   * @param {String} definition.validationErrors.title A validation error message.
   * @param {String} definition.validationErrors.jsonPointer The path to the field that contains the error. Uses JSON Pointer format.
   * @param {Number} definition.validationErrors.startLine The line where the error starts in the AsyncAPI document.
   * @param {Number} definition.validationErrors.startColumn The column where the error starts in the AsyncAPI document.
   * @param {Number} definition.validationErrors.startOffset The offset (starting from the beginning of the document) where the error starts in the AsyncAPI document.
   * @param {Number} definition.validationErrors.endLine The line where the error ends in the AsyncAPI document.
   * @param {Number} definition.validationErrors.endColumn The column where the error ends in the AsyncAPI document.
   * @param {Number} definition.validationErrors.endOffset The offset (starting from the beginning of the document) where the error ends in the AsyncAPI document.
   * @param {Object} [definition.location] Error location details after trying to parse an invalid JSON or YAML document.
   * @param {Number} definition.location.startLine The line of the YAML/JSON document where the error starts.
   * @param {Number} definition.location.startColumn The column of the YAML/JSON document where the error starts.
   * @param {Number} definition.location.startOffset The offset (starting from the beginning of the document) where the error starts in the YAML/JSON AsyncAPI document.
   * @param {Object[]} [definition.refs] Error details after trying to resolve $ref's.
   * @param {String} definition.refs.title A validation error message.
   * @param {String} definition.refs.jsonPointer The path to the field that contains the error. Uses JSON Pointer format.
   * @param {Number} definition.refs.startLine The line where the error starts in the AsyncAPI document.
   * @param {Number} definition.refs.startColumn The column where the error starts in the AsyncAPI document.
   * @param {Number} definition.refs.startOffset The offset (starting from the beginning of the document) where the error starts in the AsyncAPI document.
   * @param {Number} definition.refs.endLine The line where the error ends in the AsyncAPI document.
   * @param {Number} definition.refs.endColumn The column where the error ends in the AsyncAPI document.
   * @param {Number} definition.refs.endOffset The offset (starting from the beginning of the document) where the error ends in the AsyncAPI document.
   */
  constructor(def) {
    super(def);
    this.message = def.title;
    this.type = `https://github.com/asyncapi/parser-js/${def.type}`;
    this.title = def.title;
    if (def.detail) this.detail = def.detail;
    if (def.validationErrors) this.validationErrors = def.validationErrors;
    if (def.parsedJSON) this.parsedJSON = def.parsedJSON;
    if (def.location) this.location = def.location;
    if (def.refs) this.refs = def.refs;
  }
}

module.exports = ParserError;
