/**
 * @enum {string}
 */
const SecuritySchemeTypes = {
  UserPassword: 'userPassword',
  ApiKey: 'apiKey',
  X509: 'X509',
  SymmetricEncryption: 'symmetricEncryption',
  AsymmetricEncryption: 'asymmetricEncryption',
  HttpApiKey: 'httpApiKey',
  Http: 'http',
  Oauth2: 'oauth2',
  OpenIdConnect: 'openIdConnect',
};

module.exports.SecuritySchemeTypes = SecuritySchemeTypes;