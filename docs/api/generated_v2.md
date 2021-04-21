
## [AsyncAPIDocument](#module_@asyncapi/parser+AsyncAPIDocument) ⇐ <code>Base</code>
* [.version()](#module_@asyncapi/parser+AsyncAPIDocument+version) ⇒ <code>string</code>
* [.hasId()](#module_@asyncapi/parser+AsyncAPIDocument+hasId) ⇒ <code>boolean</code>
* [.id()](#module_@asyncapi/parser+AsyncAPIDocument+id) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasDefaultContentType()](#module_@asyncapi/parser+AsyncAPIDocument+hasDefaultContentType) ⇒ <code>boolean</code>
* [.defaultContentType()](#module_@asyncapi/parser+AsyncAPIDocument+defaultContentType) ⇒ <code>string</code> \| <code>undefined</code>
* [.info()](#module_@asyncapi/parser+AsyncAPIDocument+info) ⇒ <code>Info</code>
* [.applicationPublishableChannels()](#module_@asyncapi/parser+AsyncAPIDocument+applicationPublishableChannels) ⇒ <code>Array.&lt;Channel&gt;</code>
* [.applicationSubscribableChannels()](#module_@asyncapi/parser+AsyncAPIDocument+applicationSubscribableChannels) ⇒ <code>Array.&lt;Channel&gt;</code>
* [.clientPublishableChannels()](#module_@asyncapi/parser+AsyncAPIDocument+clientPublishableChannels) ⇒ <code>Array.&lt;Channel&gt;</code>
* [.clientSubscribableChannels()](#module_@asyncapi/parser+AsyncAPIDocument+clientSubscribableChannels) ⇒ <code>Array.&lt;Channel&gt;</code>
* [.channels()](#module_@asyncapi/parser+AsyncAPIDocument+channels) ⇒ <code>Array.&lt;Channel&gt;</code>
* [.applicationPublishableMessages()](#module_@asyncapi/parser+AsyncAPIDocument+applicationPublishableMessages) ⇒ <code>Array.&lt;Message&gt;</code>
* [.applicationSubscribableMessages()](#module_@asyncapi/parser+AsyncAPIDocument+applicationSubscribableMessages) ⇒ <code>Array.&lt;Message&gt;</code>
* [.clientPublishableMessages()](#module_@asyncapi/parser+AsyncAPIDocument+clientPublishableMessages) ⇒ <code>Array.&lt;Message&gt;</code>
* [.clientSubscribableMessages()](#module_@asyncapi/parser+AsyncAPIDocument+clientSubscribableMessages) ⇒ <code>Array.&lt;Message&gt;</code>
* [.messages()](#module_@asyncapi/parser+AsyncAPIDocument+messages) ⇒ <code>Array.&lt;Message&gt;</code>
* [.applicationPublishOperations()](#module_@asyncapi/parser+AsyncAPIDocument+applicationPublishOperations) ⇒ <code>Array.&lt;Operation&gt;</code>
* [.applicationSubscribeOperations()](#module_@asyncapi/parser+AsyncAPIDocument+applicationSubscribeOperations) ⇒ <code>Array.&lt;Operation&gt;</code>
* [.clientPublishOperations()](#module_@asyncapi/parser+AsyncAPIDocument+clientPublishOperations) ⇒ <code>Array.&lt;Operation&gt;</code>
* [.clientSubscribeOperations()](#module_@asyncapi/parser+AsyncAPIDocument+clientSubscribeOperations) ⇒ <code>Array.&lt;Operation&gt;</code>
* [.operations()](#module_@asyncapi/parser+AsyncAPIDocument+operations) ⇒ <code>Array.&lt;Operation&gt;</code>
* [.schemas()](#module_@asyncapi/parser+AsyncAPIDocument+schemas) ⇒ <code>Array.&lt;Schema&gt;</code>
* [.hasServers()](#module_@asyncapi/parser+AsyncAPIDocument+hasServers) ⇒ <code>boolean</code>
* [.servers()](#module_@asyncapi/parser+AsyncAPIDocument+servers) ⇒ <code>Array.&lt;Server&gt;</code>
* [.server()](#module_@asyncapi/parser+AsyncAPIDocument+server) ⇒ <code>Server</code> \| <code>undefined</code>
* [.securitySchemes()](#module_@asyncapi/parser+AsyncAPIDocument+securitySchemes) ⇒ <code>Array.&lt;SecurityScheme&gt;</code>
* [.hasExternalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+hasExternalDocs) ⇒ <code>boolean</code>
* [.externalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+externalDocs) ⇒ <code>ExternalDocument</code> \| <code>undefined</code>
* [.hasTags()](#module_@asyncapi/parser+AsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
* [.tags()](#module_@asyncapi/parser+AsyncAPIDocument+tags) ⇒ <code>Array.&lt;Tag&gt;</code> \| <code>undefined</code>
## [Base](#module_@asyncapi/parser+Base)
* [.json()](#module_@asyncapi/parser+Base+json) ⇒ <code>any</code>
* [.hasExtension()](#module_@asyncapi/parser+Base+hasExtension) ⇒ <code>boolean</code>
* [.extension()](#module_@asyncapi/parser+Base+extension) ⇒ <code>any</code> \| <code>undefined</code>
## [Channel](#module_@asyncapi/parser+Channel) ⇐ <code>Base</code>
* [.operations()](#module_@asyncapi/parser+Channel+operations) ⇒ <code>Array.&lt;Operation&gt;</code>
* [.path()](#module_@asyncapi/parser+Channel+path) ⇒ <code>string</code>
* [.messages()](#module_@asyncapi/parser+Channel+messages) ⇒ <code>Array.&lt;Message&gt;</code>
* [.hasBinding(bindingProtocol)](#module_@asyncapi/parser+Channel+hasBinding) ⇒ <code>boolean</code>
* [.binding(bindingProtocol)](#module_@asyncapi/parser+Channel+binding) ⇒ <code>any</code> \| <code>undefined</code>
* [.hasParameters()](#module_@asyncapi/parser+Channel+hasParameters) ⇒ <code>boolean</code>
* [.parameters()](#module_@asyncapi/parser+Channel+parameters) ⇒ <code>Array.&lt;Schema&gt;</code> \| <code>undefined</code>
* [.hasDescription()](#module_@asyncapi/parser+Channel+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+Channel+description) ⇒ <code>string</code> \| <code>undefined</code>
## [Contact](#module_@asyncapi/parser+Contact) ⇐ <code>Base</code>
* [.hasName()](#module_@asyncapi/parser+Contact+hasName) ⇒ <code>boolean</code>
* [.name()](#module_@asyncapi/parser+Contact+name) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasUrl()](#module_@asyncapi/parser+Contact+hasUrl) ⇒ <code>boolean</code>
* [.url()](#module_@asyncapi/parser+Contact+url) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasEmail()](#module_@asyncapi/parser+Contact+hasEmail) ⇒ <code>boolean</code>
* [.email()](#module_@asyncapi/parser+Contact+email) ⇒ <code>string</code> \| <code>undefined</code>
## [CorrelationId](#module_@asyncapi/parser+CorrelationId) ⇐ <code>Base</code>
* [.hasDescription()](#module_@asyncapi/parser+CorrelationId+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+CorrelationId+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasLocation()](#module_@asyncapi/parser+CorrelationId+hasLocation) ⇒ <code>boolean</code>
* [.location()](#module_@asyncapi/parser+CorrelationId+location) ⇒ <code>string</code> \| <code>undefined</code>
## [ExternalDocument](#module_@asyncapi/parser+ExternalDocument) ⇐ <code>Base</code>
* [.hasDescription()](#module_@asyncapi/parser+ExternalDocument+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+ExternalDocument+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasUrl()](#module_@asyncapi/parser+ExternalDocument+hasUrl) ⇒ <code>boolean</code>
* [.url()](#module_@asyncapi/parser+ExternalDocument+url) ⇒ <code>string</code> \| <code>undefined</code>
## [Info](#module_@asyncapi/parser+Info) ⇐ <code>Base</code>
* [.title()](#module_@asyncapi/parser+Info+title) ⇒ <code>string</code>
* [.version()](#module_@asyncapi/parser+Info+version) ⇒ <code>string</code>
* [.hasDescription()](#module_@asyncapi/parser+Info+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+Info+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasTermsOfService()](#module_@asyncapi/parser+Info+hasTermsOfService) ⇒ <code>boolean</code>
* [.termsOfService()](#module_@asyncapi/parser+Info+termsOfService) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasContact()](#module_@asyncapi/parser+Info+hasContact) ⇒ <code>boolean</code>
* [.contact()](#module_@asyncapi/parser+Info+contact) ⇒ <code>Contact</code> \| <code>undefined</code>
* [.hasLicense()](#module_@asyncapi/parser+Info+hasLicense) ⇒ <code>boolean</code>
* [.license()](#module_@asyncapi/parser+Info+license) ⇒ <code>License</code> \| <code>undefined</code>
## [License](#module_@asyncapi/parser+License) ⇐ <code>Base</code>
* [.name()](#module_@asyncapi/parser+License+name) ⇒ <code>string</code>
* [.hasUrl()](#module_@asyncapi/parser+License+hasUrl) ⇒ <code>boolean</code>
* [.url()](#module_@asyncapi/parser+License+url) ⇒ <code>string</code> \| <code>undefined</code>
## [Message](#module_@asyncapi/parser+Message) ⇐ <code>Base</code>
* [.uid()](#module_@asyncapi/parser+Message+uid) ⇒ <code>string</code>
* [.payload()](#module_@asyncapi/parser+Message+payload) ⇒ <code>Schema</code>
* [.channels()](#module_@asyncapi/parser+Message+channels) ⇒ <code>Array.&lt;Channel&gt;</code>
* [.operations()](#module_@asyncapi/parser+Message+operations) ⇒ <code>Array.&lt;Operation&gt;</code>
* [.hasName()](#module_@asyncapi/parser+Message+hasName) ⇒ <code>boolean</code>
* [.name()](#module_@asyncapi/parser+Message+name) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasSummary()](#module_@asyncapi/parser+Message+hasSummary) ⇒ <code>boolean</code>
* [.summary()](#module_@asyncapi/parser+Message+summary) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasTitle()](#module_@asyncapi/parser+Message+hasTitle) ⇒ <code>boolean</code>
* [.title()](#module_@asyncapi/parser+Message+title) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasHeaders()](#module_@asyncapi/parser+Message+hasHeaders) ⇒ <code>boolean</code>
* [.headers()](#module_@asyncapi/parser+Message+headers) ⇒ <code>Schema</code> \| <code>undefined</code>
* [.hasBinding(bindingProtocol)](#module_@asyncapi/parser+Message+hasBinding) ⇒ <code>boolean</code>
* [.binding(bindingProtocol)](#module_@asyncapi/parser+Message+binding) ⇒ <code>any</code> \| <code>undefined</code>
* [.contentType()](#module_@asyncapi/parser+Message+contentType) ⇒ <code>string</code>
* [.examples()](#module_@asyncapi/parser+Message+examples) ⇒ <code>Map.&lt;string, any&gt;</code>
* [.hasCorrelationId()](#module_@asyncapi/parser+Message+hasCorrelationId) ⇒ <code>boolean</code>
* [.correlationId()](#module_@asyncapi/parser+Message+correlationId) ⇒ <code>CorrelationId</code> \| <code>undefined</code>
* [.hasTags()](#module_@asyncapi/parser+Message+hasTags) ⇒ <code>boolean</code>
* [.tags()](#module_@asyncapi/parser+Message+tags) ⇒ <code>Array.&lt;Tag&gt;</code> \| <code>undefined</code>
* [.hasDescription()](#module_@asyncapi/parser+Message+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+Message+description) ⇒ <code>string</code> \| <code>undefined</code>
## [OAuthFlow](#module_@asyncapi/parser+OAuthFlow) ⇐ <code>Base</code>
* [.authorizationUrl()](#module_@asyncapi/parser+OAuthFlow+authorizationUrl) ⇒ <code>string</code> \| <code>undefined</code>
* [.tokenUrl()](#module_@asyncapi/parser+OAuthFlow+tokenUrl) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasRefreshUrl()](#module_@asyncapi/parser+OAuthFlow+hasRefreshUrl) ⇒ <code>boolean</code>
* [.refreshUrl()](#module_@asyncapi/parser+OAuthFlow+refreshUrl) ⇒ <code>string</code> \| <code>undefined</code>
* [.scopes()](#module_@asyncapi/parser+OAuthFlow+scopes) ⇒ <code>Object.&lt;string, string&gt;</code> \| <code>undefined</code>
## [OAuthFlows](#module_@asyncapi/parser+OAuthFlows) ⇐ <code>Base</code>
* [.hasImplicit()](#module_@asyncapi/parser+OAuthFlows+hasImplicit) ⇒ <code>boolean</code>
* [.implicit()](#module_@asyncapi/parser+OAuthFlows+implicit) ⇒ <code>OAuthFlow</code> \| <code>undefined</code>
* [.hasPassword()](#module_@asyncapi/parser+OAuthFlows+hasPassword) ⇒ <code>boolean</code>
* [.password()](#module_@asyncapi/parser+OAuthFlows+password) ⇒ <code>OAuthFlow</code> \| <code>undefined</code>
* [.hasClientCredentials()](#module_@asyncapi/parser+OAuthFlows+hasClientCredentials) ⇒ <code>boolean</code>
* [.clientCredentials()](#module_@asyncapi/parser+OAuthFlows+clientCredentials) ⇒ <code>OAuthFlow</code> \| <code>undefined</code>
* [.hasAuthorizationCode()](#module_@asyncapi/parser+OAuthFlows+hasAuthorizationCode) ⇒ <code>boolean</code>
* [.authorizationCode()](#module_@asyncapi/parser+OAuthFlows+authorizationCode) ⇒ <code>OAuthFlow</code> \| <code>undefined</code>
## [Operation](#module_@asyncapi/parser+Operation) ⇐ <code>Base</code>
* [.id()](#module_@asyncapi/parser+Operation+id) ⇒ <code>string</code>
* [.hasDescription()](#module_@asyncapi/parser+Operation+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+Operation+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasSummary()](#module_@asyncapi/parser+Operation+hasSummary) ⇒ <code>boolean</code>
* [.summary()](#module_@asyncapi/parser+Operation+summary) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasMultipleMessages()](#module_@asyncapi/parser+Operation+hasMultipleMessages) ⇒ <code>boolean</code>
* [.messages()](#module_@asyncapi/parser+Operation+messages) ⇒ <code>Array.&lt;Message&gt;</code>
* [.channels()](#module_@asyncapi/parser+Operation+channels) ⇒ <code>Array.&lt;Channel&gt;</code>
* [.hasBinding(bindingProtocol)](#module_@asyncapi/parser+Operation+hasBinding) ⇒ <code>boolean</code>
* [.binding(bindingProtocol)](#module_@asyncapi/parser+Operation+binding) ⇒ <code>any</code> \| <code>undefined</code>
* [.servers()](#module_@asyncapi/parser+Operation+servers) ⇒ <code>Array.&lt;Server&gt;</code>
* [.server()](#module_@asyncapi/parser+Operation+server) ⇒ <code>Server</code>
* [.isClientSubscribing()](#module_@asyncapi/parser+Operation+isClientSubscribing) ⇒ <code>boolean</code>
* [.isClientPublishing()](#module_@asyncapi/parser+Operation+isClientPublishing) ⇒ <code>boolean</code>
* [.isApplicationSubscribing()](#module_@asyncapi/parser+Operation+isApplicationSubscribing) ⇒ <code>boolean</code>
* [.isApplicationPublishing()](#module_@asyncapi/parser+Operation+isApplicationPublishing) ⇒ <code>boolean</code>
* [.type()](#module_@asyncapi/parser+Operation+type) ⇒ [<code>Types</code>](#Types)
* [.hasExternalDocs()](#module_@asyncapi/parser+Operation+hasExternalDocs) ⇒ <code>boolean</code>
* [.externalDocs()](#module_@asyncapi/parser+Operation+externalDocs) ⇒ <code>ExternalDocument</code> \| <code>undefined</code>
* [.hasTags()](#module_@asyncapi/parser+Operation+hasTags) ⇒ <code>boolean</code>
* [.tags()](#module_@asyncapi/parser+Operation+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
## [SecurityScheme](#module_@asyncapi/parser+SecurityScheme) ⇐ <code>Base</code>
* [.type()](#module_@asyncapi/parser+SecurityScheme+type) ⇒ [<code>Types</code>](#Types)
* [.name()](#module_@asyncapi/parser+SecurityScheme+name) ⇒ <code>string</code>
* [.in()](#module_@asyncapi/parser+SecurityScheme+in) ⇒ [<code>ApiKeyLocations</code>](#ApiKeyLocations)
* [.hasSchema()](#module_@asyncapi/parser+SecurityScheme+hasSchema) ⇒ <code>boolean</code>
* [.scheme()](#module_@asyncapi/parser+SecurityScheme+scheme) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasBearerFormat()](#module_@asyncapi/parser+SecurityScheme+hasBearerFormat) ⇒ <code>boolean</code>
* [.bearerFormat()](#module_@asyncapi/parser+SecurityScheme+bearerFormat) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasDescription()](#module_@asyncapi/parser+SecurityScheme+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+SecurityScheme+description) ⇒ <code>string</code>
* [.flows()](#module_@asyncapi/parser+SecurityScheme+flows) ⇒ <code>OAuthFlows</code>
* [.openIdConnectUrl()](#module_@asyncapi/parser+SecurityScheme+openIdConnectUrl) ⇒ <code>string</code>
## [ServerSecurity](#module_@asyncapi/parser+ServerSecurity) ⇐ <code>Base</code>
* [.securityScheme()](#module_@asyncapi/parser+ServerSecurity+securityScheme) ⇒ <code>SecurityScheme</code>
* [.values()](#module_@asyncapi/parser+ServerSecurity+values) ⇒ <code>Array.&lt;string&gt;</code>
## [ServerVariable](#module_@asyncapi/parser+ServerVariable) ⇐ <code>Base</code>
* [.hasName()](#module_@asyncapi/parser+ServerVariable+hasName) ⇒ <code>boolean</code>
* [.name()](#module_@asyncapi/parser+ServerVariable+name) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasDescription()](#module_@asyncapi/parser+ServerVariable+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+ServerVariable+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasAllowedValues()](#module_@asyncapi/parser+ServerVariable+hasAllowedValues) ⇒ <code>boolean</code>
* [.allowedValues()](#module_@asyncapi/parser+ServerVariable+allowedValues) ⇒ <code>Array.&lt;any&gt;</code>
* [.hasDefaultValue()](#module_@asyncapi/parser+ServerVariable+hasDefaultValue) ⇒ <code>boolean</code>
* [.defaultValue()](#module_@asyncapi/parser+ServerVariable+defaultValue) ⇒ <code>string</code> \| <code>undefined</code>
* [.examples()](#module_@asyncapi/parser+ServerVariable+examples) ⇒ <code>Array.&lt;string&gt;</code>
## [Server](#module_@asyncapi/parser+Server) ⇐ <code>Base</code>
* [.hasName()](#module_@asyncapi/parser+Server+hasName) ⇒ <code>boolean</code>
* [.name()](#module_@asyncapi/parser+Server+name) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasProtocol()](#module_@asyncapi/parser+Server+hasProtocol) ⇒ <code>boolean</code>
* [.protocol()](#module_@asyncapi/parser+Server+protocol) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasUrl()](#module_@asyncapi/parser+Server+hasUrl) ⇒ <code>boolean</code>
* [.url()](#module_@asyncapi/parser+Server+url) ⇒ <code>string</code> \| <code>undefined</code>
* [.operations()](#module_@asyncapi/parser+Server+operations) ⇒ <code>Array.&lt;Operation&gt;</code>
* [.variables()](#module_@asyncapi/parser+Server+variables) ⇒ <code>Array.&lt;ServerVariable&gt;</code>
* [.security()](#module_@asyncapi/parser+Server+security) ⇒ <code>Array.&lt;ServerSecurity&gt;</code>
* [.hasProtocolVersion()](#module_@asyncapi/parser+Server+hasProtocolVersion) ⇒ <code>boolean</code>
* [.protocolVersion()](#module_@asyncapi/parser+Server+protocolVersion) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasDescription()](#module_@asyncapi/parser+Server+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+Server+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasBinding(bindingProtocol)](#module_@asyncapi/parser+Server+hasBinding) ⇒ <code>boolean</code>
* [.binding(bindingProtocol)](#module_@asyncapi/parser+Server+binding) ⇒ <code>any</code> \| <code>undefined</code>
## [Tag](#module_@asyncapi/parser+Tag) ⇐ <code>Base</code>
* [.name()](#module_@asyncapi/parser+Tag+name) ⇒ <code>string</code>
* [.hasDescription()](#module_@asyncapi/parser+Tag+hasDescription) ⇒ <code>boolean</code>
* [.description()](#module_@asyncapi/parser+Tag+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.hasExternalDocs()](#module_@asyncapi/parser+Tag+hasExternalDocs) ⇒ <code>boolean</code>
* [.externalDocs()](#module_@asyncapi/parser+Tag+externalDocs) ⇒ <code>ExternalDocument</code> \| <code>undefined</code>