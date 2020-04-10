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
   * @param {Object} definition.validationErrors.start An object containing information about where the error starts in the JSON AsyncAPI document.
   * @param {Number} definition.validationErrors.start.line The line where the error starts in the JSON AsyncAPI document.
   * @param {Number} definition.validationErrors.start.column The column where the error starts in the JSON AsyncAPI document.
   * @param {Number} definition.validationErrors.start.offset The offset (starting from the beginning of the document) where the error starts in the JSON AsyncAPI document.
   * @param {Object} [definition.validationErrors.end] An object containing information about where the error ends in the JSON AsyncAPI document.
   * @param {Number} definition.validationErrors.end.line The line where the error ends in the JSON AsyncAPI document.
   * @param {Number} definition.validationErrors.end.column The column where the error ends in the JSON AsyncAPI document.
   * @param {Number} definition.validationErrors.end.offset The offset (starting from the beginning of the document) where the error ends in the JSON AsyncAPI document.
   * @param {String} definition.validationErrors.error A validation error message.
   * @param {String} definition.validationErrors.path The path to the field that contains the error. Uses JSON Pointer format.
   * @param {String} [definition.validationErrors.suggestion] A suggestion of what the correct value.
   * @param {Object} [definition.yamlError] Error details after trying to parse a YAML AsyncAPI document.
   * @param {Number} definition.yamlError.startLine The line of the YAML AsyncAPI document where the error starts.
   * @param {Number} definition.yamlError.startColumn The column of the YAML AsyncAPI document where the error starts.
   */
  constructor(def) {
    super(def);
    this.message = def.title;
    this.type = `https://github.com/asyncapi/parser-js/${def.type}`;
    this.title = def.title;
    if (def.detail) this.detail = def.detail;
    if (def.validationErrors) this.validationErrors = def.validationErrors;
    if (def.parsedJSON) this.parsedJSON = def.parsedJSON;
    if (def.yamlError) this.yamlError = def.yamlError;
  }
}

module.exports = ParserError;
