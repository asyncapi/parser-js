Missing: 
- hasContentType(args)
- hasChannels        
* [.IntentAsyncAPIDocument](#module_@asyncapi/parser+IntentAsyncAPIDocument) ⇐ <code>IntentBase</code>
    * [.version()](#module_@asyncapi/parser+IntentAsyncAPIDocument+version) ⇒ <code>string</code>
    * [.hasId()](#module_@asyncapi/parser+IntentAsyncAPIDocument+hasId) ⇒ <code>boolean</code>
    * [.id()](#module_@asyncapi/parser+IntentAsyncAPIDocument+id) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasDefaultContentType()](#module_@asyncapi/parser+IntentAsyncAPIDocument+hasDefaultContentType) ⇒ <code>boolean</code>
    * [.defaultContentType()](#module_@asyncapi/parser+IntentAsyncAPIDocument+defaultContentType) ⇒ <code>string</code> \| <code>undefined</code>
    * [.info()](#module_@asyncapi/parser+IntentAsyncAPIDocument+info) ⇒ <code>IntentInfo</code>
    * [.applicationPublishableChannels()](#module_@asyncapi/parser+IntentAsyncAPIDocument+applicationPublishableChannels) ⇒ <code>Array.&lt;IntentChannel&gt;</code>
    * [.applicationSubscribableChannels()](#module_@asyncapi/parser+IntentAsyncAPIDocument+applicationSubscribableChannels) ⇒ <code>Array.&lt;IntentChannel&gt;</code>
    * [.clientPublishableChannels()](#module_@asyncapi/parser+IntentAsyncAPIDocument+clientPublishableChannels) ⇒ <code>Array.&lt;IntentChannel&gt;</code>
    * [.clientSubscribableChannels()](#module_@asyncapi/parser+IntentAsyncAPIDocument+clientSubscribableChannels) ⇒ <code>Array.&lt;IntentChannel&gt;</code>
    * [.channels()](#module_@asyncapi/parser+IntentAsyncAPIDocument+channels) ⇒ <code>Array.&lt;IntentChannel&gt;</code>
    * [.applicationPublishableMessages()](#module_@asyncapi/parser+IntentAsyncAPIDocument+applicationPublishableMessages) ⇒ <code>Array.&lt;IntentMessage&gt;</code>
    * [.applicationSubscribableMessages()](#module_@asyncapi/parser+IntentAsyncAPIDocument+applicationSubscribableMessages) ⇒ <code>Array.&lt;IntentMessage&gt;</code>
    * [.clientPublishableMessages()](#module_@asyncapi/parser+IntentAsyncAPIDocument+clientPublishableMessages) ⇒ <code>Array.&lt;IntentMessage&gt;</code>
    * [.clientSubscribableMessages()](#module_@asyncapi/parser+IntentAsyncAPIDocument+clientSubscribableMessages) ⇒ <code>Array.&lt;IntentMessage&gt;</code>
    * [.messages()](#module_@asyncapi/parser+IntentAsyncAPIDocument+messages) ⇒ <code>Array.&lt;IntentMessage&gt;</code>
    * [.applicationPublishOperations()](#module_@asyncapi/parser+IntentAsyncAPIDocument+applicationPublishOperations) ⇒ <code>Array.&lt;IntentOperation&gt;</code>
    * [.applicationSubscribeOperations()](#module_@asyncapi/parser+IntentAsyncAPIDocument+applicationSubscribeOperations) ⇒ <code>Array.&lt;IntentOperation&gt;</code>
    * [.clientPublishOperations()](#module_@asyncapi/parser+IntentAsyncAPIDocument+clientPublishOperations) ⇒ <code>Array.&lt;IntentOperation&gt;</code>
    * [.clientSubscribeOperations()](#module_@asyncapi/parser+IntentAsyncAPIDocument+clientSubscribeOperations) ⇒ <code>Array.&lt;IntentOperation&gt;</code>
    * [.operations()](#module_@asyncapi/parser+IntentAsyncAPIDocument+operations) ⇒ <code>Array.&lt;IntentOperation&gt;</code>
    * [.schemas()](#module_@asyncapi/parser+IntentAsyncAPIDocument+schemas) ⇒ <code>Array.&lt;Schema&gt;</code>
    * [.hasServers()](#module_@asyncapi/parser+IntentAsyncAPIDocument+hasServers) ⇒ <code>boolean</code>
    * [.servers()](#module_@asyncapi/parser+IntentAsyncAPIDocument+servers) ⇒ <code>Array.&lt;IntentServer&gt;</code>
    * [.server()](#module_@asyncapi/parser+IntentAsyncAPIDocument+server) ⇒ <code>IntentServer</code> \| <code>undefined</code>
    * [.securitySchemes()](#module_@asyncapi/parser+IntentAsyncAPIDocument+securitySchemes) ⇒ <code>Array.&lt;SecurityScheme&gt;</code>
    * [.hasExternalDocs()](#module_@asyncapi/parser+IntentAsyncAPIDocument+hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#module_@asyncapi/parser+IntentAsyncAPIDocument+externalDocs) ⇒ <code>IntentExternalDocument</code> \| <code>undefined</code>
    * [.hasTags()](#module_@asyncapi/parser+IntentAsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+IntentAsyncAPIDocument+tags) ⇒ <code>Array.&lt;IntentTag&gt;</code> \| <code>undefined</code>
* [.IntentBase](#module_@asyncapi/parser+IntentBase)
    * [.json()](#module_@asyncapi/parser+IntentBase+json) ⇒ <code>any</code>
    * [.hasExtension()](#module_@asyncapi/parser+IntentBase+hasExtension) ⇒ <code>boolean</code>
    * [.extension()](#module_@asyncapi/parser+IntentBase+extension) ⇒ <code>any</code> \| <code>undefined</code>
* [.IntentChannel](#module_@asyncapi/parser+IntentChannel) ⇐ <code>IntentBase</code>
    * [.operations()](#module_@asyncapi/parser+IntentChannel+operations) ⇒ <code>Array.&lt;IntentOperation&gt;</code>
    * [.path()](#module_@asyncapi/parser+IntentChannel+path) ⇒ <code>string</code>
    * [.messages()](#module_@asyncapi/parser+IntentChannel+messages) ⇒ <code>Array.&lt;IntentMessage&gt;</code>
    * [.hasBinding(bindingProtocol)](#module_@asyncapi/parser+IntentChannel+hasBinding) ⇒ <code>boolean</code>
    * [.binding(bindingProtocol)](#module_@asyncapi/parser+IntentChannel+binding) ⇒ <code>any</code> \| <code>undefined</code>
    * [.hasParameters()](#module_@asyncapi/parser+IntentChannel+hasParameters) ⇒ <code>boolean</code>
    * [.parameters()](#module_@asyncapi/parser+IntentChannel+parameters) ⇒ <code>Array.&lt;Schema&gt;</code> \| <code>undefined</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentChannel+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentChannel+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.IntentContact](#module_@asyncapi/parser+IntentContact) ⇐ <code>IntentBase</code>
    * [.hasName()](#module_@asyncapi/parser+IntentContact+hasName) ⇒ <code>boolean</code>
    * [.name()](#module_@asyncapi/parser+IntentContact+name) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasUrl()](#module_@asyncapi/parser+IntentContact+hasUrl) ⇒ <code>boolean</code>
    * [.url()](#module_@asyncapi/parser+IntentContact+url) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasEmail()](#module_@asyncapi/parser+IntentContact+hasEmail) ⇒ <code>boolean</code>
    * [.email()](#module_@asyncapi/parser+IntentContact+email) ⇒ <code>string</code> \| <code>undefined</code>
* [.IntentCorrelationId](#module_@asyncapi/parser+IntentCorrelationId) ⇐ <code>IntentBase</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentCorrelationId+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentCorrelationId+description) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasLocation()](#module_@asyncapi/parser+IntentCorrelationId+hasLocation) ⇒ <code>boolean</code>
    * [.location()](#module_@asyncapi/parser+IntentCorrelationId+location) ⇒ <code>string</code> \| <code>undefined</code>
* [.IntentExternalDocument](#module_@asyncapi/parser+IntentExternalDocument) ⇐ <code>IntentBase</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentExternalDocument+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentExternalDocument+description) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasUrl()](#module_@asyncapi/parser+IntentExternalDocument+hasUrl) ⇒ <code>boolean</code>
    * [.url()](#module_@asyncapi/parser+IntentExternalDocument+url) ⇒ <code>string</code> \| <code>undefined</code>
* [.IntentInfo](#module_@asyncapi/parser+IntentInfo) ⇐ <code>IntentBase</code>
    * [.title()](#module_@asyncapi/parser+IntentInfo+title) ⇒ <code>string</code>
    * [.version()](#module_@asyncapi/parser+IntentInfo+version) ⇒ <code>string</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentInfo+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentInfo+description) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasTermsOfService()](#module_@asyncapi/parser+IntentInfo+hasTermsOfService) ⇒ <code>boolean</code>
    * [.termsOfService()](#module_@asyncapi/parser+IntentInfo+termsOfService) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasContact()](#module_@asyncapi/parser+IntentInfo+hasContact) ⇒ <code>boolean</code>
    * [.contact()](#module_@asyncapi/parser+IntentInfo+contact) ⇒ <code>IntentContact</code> \| <code>undefined</code>
    * [.hasLicense()](#module_@asyncapi/parser+IntentInfo+hasLicense) ⇒ <code>boolean</code>
    * [.license()](#module_@asyncapi/parser+IntentInfo+license) ⇒ <code>IntentLicense</code> \| <code>undefined</code>
* [.IntentLicense](#module_@asyncapi/parser+IntentLicense) ⇐ <code>IntentBase</code>
    * [.name()](#module_@asyncapi/parser+IntentLicense+name) ⇒ <code>string</code>
    * [.hasUrl()](#module_@asyncapi/parser+IntentLicense+hasUrl) ⇒ <code>boolean</code>
    * [.url()](#module_@asyncapi/parser+IntentLicense+url) ⇒ <code>string</code> \| <code>undefined</code>
* [.IntentMessage](#module_@asyncapi/parser+IntentMessage) ⇐ <code>IntentBase</code>
    * [.uid()](#module_@asyncapi/parser+IntentMessage+uid) ⇒ <code>string</code>
    * [.payload()](#module_@asyncapi/parser+IntentMessage+payload) ⇒ <code>Schema</code>
    * [.channels()](#module_@asyncapi/parser+IntentMessage+channels) ⇒ <code>Array.&lt;IntentChannel&gt;</code>
    * [.operations()](#module_@asyncapi/parser+IntentMessage+operations) ⇒ <code>Array.&lt;IntentOperation&gt;</code>
    * [.hasName()](#module_@asyncapi/parser+IntentMessage+hasName) ⇒ <code>boolean</code>
    * [.name()](#module_@asyncapi/parser+IntentMessage+name) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasSummary()](#module_@asyncapi/parser+IntentMessage+hasSummary) ⇒ <code>boolean</code>
    * [.summary()](#module_@asyncapi/parser+IntentMessage+summary) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasTitle()](#module_@asyncapi/parser+IntentMessage+hasTitle) ⇒ <code>boolean</code>
    * [.title()](#module_@asyncapi/parser+IntentMessage+title) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasHeaders()](#module_@asyncapi/parser+IntentMessage+hasHeaders) ⇒ <code>boolean</code>
    * [.headers()](#module_@asyncapi/parser+IntentMessage+headers) ⇒ <code>Schema</code> \| <code>undefined</code>
    * [.hasBinding(bindingProtocol)](#module_@asyncapi/parser+IntentMessage+hasBinding) ⇒ <code>boolean</code>
    * [.binding(bindingProtocol)](#module_@asyncapi/parser+IntentMessage+binding) ⇒ <code>any</code> \| <code>undefined</code>
    * [.contentType()](#module_@asyncapi/parser+IntentMessage+contentType) ⇒ <code>string</code>
    * [.examples()](#module_@asyncapi/parser+IntentMessage+examples) ⇒ <code>Map.&lt;string, any&gt;</code>
    * [.hasCorrelationId()](#module_@asyncapi/parser+IntentMessage+hasCorrelationId) ⇒ <code>boolean</code>
    * [.correlationId()](#module_@asyncapi/parser+IntentMessage+correlationId) ⇒ <code>IntentCorrelationId</code> \| <code>undefined</code>
    * [.hasTags()](#module_@asyncapi/parser+IntentMessage+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+IntentMessage+tags) ⇒ <code>Array.&lt;IntentTag&gt;</code> \| <code>undefined</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentMessage+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentMessage+description) ⇒ <code>string</code> \| <code>undefined</code>
* [.IntentOAuthFlow](#module_@asyncapi/parser+IntentOAuthFlow) ⇐ <code>Base</code>
    * [.authorizationUrl()](#module_@asyncapi/parser+IntentOAuthFlow+authorizationUrl) ⇒ <code>string</code> \| <code>undefined</code>
    * [.tokenUrl()](#module_@asyncapi/parser+IntentOAuthFlow+tokenUrl) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasRefreshUrl()](#module_@asyncapi/parser+IntentOAuthFlow+hasRefreshUrl) ⇒ <code>boolean</code>
    * [.refreshUrl()](#module_@asyncapi/parser+IntentOAuthFlow+refreshUrl) ⇒ <code>string</code> \| <code>undefined</code>
    * [.scopes()](#module_@asyncapi/parser+IntentOAuthFlow+scopes) ⇒ <code>Object.&lt;string, string&gt;</code> \| <code>undefined</code>
* [.IntentOAuthFlows](#module_@asyncapi/parser+IntentOAuthFlows) ⇐ <code>IntentBase</code>
    * [.hasImplicit()](#module_@asyncapi/parser+IntentOAuthFlows+hasImplicit) ⇒ <code>boolean</code>
    * [.implicit()](#module_@asyncapi/parser+IntentOAuthFlows+implicit) ⇒ <code>IntentOAuthFlow</code> \| <code>undefined</code>
    * [.hasPassword()](#module_@asyncapi/parser+IntentOAuthFlows+hasPassword) ⇒ <code>boolean</code>
    * [.password()](#module_@asyncapi/parser+IntentOAuthFlows+password) ⇒ <code>IntentOAuthFlow</code> \| <code>undefined</code>
    * [.hasClientCredentials()](#module_@asyncapi/parser+IntentOAuthFlows+hasClientCredentials) ⇒ <code>boolean</code>
    * [.clientCredentials()](#module_@asyncapi/parser+IntentOAuthFlows+clientCredentials) ⇒ <code>IntentOAuthFlow</code> \| <code>undefined</code>
    * [.hasAuthorizationCode()](#module_@asyncapi/parser+IntentOAuthFlows+hasAuthorizationCode) ⇒ <code>boolean</code>
    * [.authorizationCode()](#module_@asyncapi/parser+IntentOAuthFlows+authorizationCode) ⇒ <code>IntentOAuthFlow</code> \| <code>undefined</code>
* [.IntentOperation](#module_@asyncapi/parser+IntentOperation) ⇐ <code>IntentBase</code>
    * [.id()](#module_@asyncapi/parser+IntentOperation+id) ⇒ <code>string</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentOperation+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentOperation+description) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasSummary()](#module_@asyncapi/parser+IntentOperation+hasSummary) ⇒ <code>boolean</code>
    * [.summary()](#module_@asyncapi/parser+IntentOperation+summary) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasMultipleMessages()](#module_@asyncapi/parser+IntentOperation+hasMultipleMessages) ⇒ <code>boolean</code>
    * [.messages()](#module_@asyncapi/parser+IntentOperation+messages) ⇒ <code>Array.&lt;IntentMessage&gt;</code>
    * [.channels()](#module_@asyncapi/parser+IntentOperation+channels) ⇒ <code>Array.&lt;IntentChannel&gt;</code>
    * [.hasBinding(bindingProtocol)](#module_@asyncapi/parser+IntentOperation+hasBinding) ⇒ <code>boolean</code>
    * [.binding(bindingProtocol)](#module_@asyncapi/parser+IntentOperation+binding) ⇒ <code>any</code> \| <code>undefined</code>
    * [.servers()](#module_@asyncapi/parser+IntentOperation+servers) ⇒ <code>Array.&lt;IntentServer&gt;</code>
    * [.server()](#module_@asyncapi/parser+IntentOperation+server) ⇒ <code>IntentServer</code>
    * [.isClientSubscribing()](#module_@asyncapi/parser+IntentOperation+isClientSubscribing) ⇒ <code>boolean</code>
    * [.isClientPublishing()](#module_@asyncapi/parser+IntentOperation+isClientPublishing) ⇒ <code>boolean</code>
    * [.isApplicationSubscribing()](#module_@asyncapi/parser+IntentOperation+isApplicationSubscribing) ⇒ <code>boolean</code>
    * [.isApplicationPublishing()](#module_@asyncapi/parser+IntentOperation+isApplicationPublishing) ⇒ <code>boolean</code>
    * [.type()](#module_@asyncapi/parser+IntentOperation+type) ⇒ [<code>Types</code>](#Types)
    * [.hasExternalDocs()](#module_@asyncapi/parser+IntentOperation+hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#module_@asyncapi/parser+IntentOperation+externalDocs) ⇒ <code>IntentExternalDocument</code> \| <code>undefined</code>
    * [.hasTags()](#module_@asyncapi/parser+IntentOperation+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+IntentOperation+tags) ⇒ <code>Array.&lt;IntentTag&gt;</code>
* [.IntentSecurityScheme](#module_@asyncapi/parser+IntentSecurityScheme) ⇐ <code>IntentBase</code>
    * [.type()](#module_@asyncapi/parser+IntentSecurityScheme+type) ⇒ [<code>Types</code>](#Types)
    * [.name()](#module_@asyncapi/parser+IntentSecurityScheme+name) ⇒ <code>string</code>
    * [.in()](#module_@asyncapi/parser+IntentSecurityScheme+in) ⇒ [<code>ApiKeyLocations</code>](#ApiKeyLocations)
    * [.hasSchema()](#module_@asyncapi/parser+IntentSecurityScheme+hasSchema) ⇒ <code>boolean</code>
    * [.scheme()](#module_@asyncapi/parser+IntentSecurityScheme+scheme) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasBearerFormat()](#module_@asyncapi/parser+IntentSecurityScheme+hasBearerFormat) ⇒ <code>boolean</code>
    * [.bearerFormat()](#module_@asyncapi/parser+IntentSecurityScheme+bearerFormat) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentSecurityScheme+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentSecurityScheme+description) ⇒ <code>string</code>
    * [.flows()](#module_@asyncapi/parser+IntentSecurityScheme+flows) ⇒ <code>IntentOAuthFlows</code>
    * [.openIdConnectUrl()](#module_@asyncapi/parser+IntentSecurityScheme+openIdConnectUrl) ⇒ <code>string</code>
* [.IntentServerSecurity](#module_@asyncapi/parser+IntentServerSecurity) ⇐ <code>IntentBase</code>
    * [.securityScheme()](#module_@asyncapi/parser+IntentServerSecurity+securityScheme) ⇒ <code>IntentSecurityScheme</code>
    * [.values()](#module_@asyncapi/parser+IntentServerSecurity+values) ⇒ <code>Array.&lt;string&gt;</code>
* [.IntentServerVariable](#module_@asyncapi/parser+IntentServerVariable) ⇐ <code>IntentBase</code>
    * [.hasName()](#module_@asyncapi/parser+IntentServerVariable+hasName) ⇒ <code>boolean</code>
    * [.name()](#module_@asyncapi/parser+IntentServerVariable+name) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentServerVariable+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentServerVariable+description) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasAllowedValues()](#module_@asyncapi/parser+IntentServerVariable+hasAllowedValues) ⇒ <code>boolean</code>
    * [.allowedValues()](#module_@asyncapi/parser+IntentServerVariable+allowedValues) ⇒ <code>Array.&lt;any&gt;</code>
    * [.hasDefaultValue()](#module_@asyncapi/parser+IntentServerVariable+hasDefaultValue) ⇒ <code>boolean</code>
    * [.defaultValue()](#module_@asyncapi/parser+IntentServerVariable+defaultValue) ⇒ <code>string</code> \| <code>undefined</code>
    * [.examples()](#module_@asyncapi/parser+IntentServerVariable+examples) ⇒ <code>Array.&lt;string&gt;</code>
* [.IntentServer](#module_@asyncapi/parser+IntentServer) ⇐ <code>IntentBase</code>
    * [.hasName()](#module_@asyncapi/parser+IntentServer+hasName) ⇒ <code>boolean</code>
    * [.name()](#module_@asyncapi/parser+IntentServer+name) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasProtocol()](#module_@asyncapi/parser+IntentServer+hasProtocol) ⇒ <code>boolean</code>
    * [.protocol()](#module_@asyncapi/parser+IntentServer+protocol) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasUrl()](#module_@asyncapi/parser+IntentServer+hasUrl) ⇒ <code>boolean</code>
    * [.url()](#module_@asyncapi/parser+IntentServer+url) ⇒ <code>string</code> \| <code>undefined</code>
    * [.operations()](#module_@asyncapi/parser+IntentServer+operations) ⇒ <code>Array.&lt;IntentOperation&gt;</code>
    * [.variables()](#module_@asyncapi/parser+IntentServer+variables) ⇒ <code>Array.&lt;IntentServerVariable&gt;</code>
    * [.security()](#module_@asyncapi/parser+IntentServer+security) ⇒ <code>Array.&lt;IntentServerSecurity&gt;</code>
    * [.hasProtocolVersion()](#module_@asyncapi/parser+IntentServer+hasProtocolVersion) ⇒ <code>boolean</code>
    * [.protocolVersion()](#module_@asyncapi/parser+IntentServer+protocolVersion) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentServer+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentServer+description) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasBinding(bindingProtocol)](#module_@asyncapi/parser+IntentServer+hasBinding) ⇒ <code>boolean</code>
    * [.binding(bindingProtocol)](#module_@asyncapi/parser+IntentServer+binding) ⇒ <code>any</code> \| <code>undefined</code>
* [.IntentTag](#module_@asyncapi/parser+IntentTag) ⇐ <code>IntentBase</code>
    * [.name()](#module_@asyncapi/parser+IntentTag+name) ⇒ <code>string</code>
    * [.hasDescription()](#module_@asyncapi/parser+IntentTag+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+IntentTag+description) ⇒ <code>string</code> \| <code>undefined</code>
    * [.hasExternalDocs()](#module_@asyncapi/parser+IntentTag+hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#module_@asyncapi/parser+IntentTag+externalDocs) ⇒ <code>IntentExternalDocument</code> \| <code>undefined</code>