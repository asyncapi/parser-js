import { Document } from '@stoplight/spectral-core';

import {
  AsyncAPIDocumentV2,
  AsyncAPIDocumentV3,
  ParserAPIVersion,
} from '../src/models';
import { Parser } from '../src/parser';
import { xParserApiVersion } from '../src/constants';

describe('parse()', function () {
  const parser = new Parser();

  it('should parse valid document', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {},
    };
    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should not parse valid v3 document', async function () {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {},
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);
  });

  it('should parse invalid document', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
    };
    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toEqual(undefined);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should parse invalid v3 document', async function () {
    const documentRaw = {
      asyncapi: '3.0.0',
      not_a_valid_info_object: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
    };
    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document === undefined).toEqual(true);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should return extras', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {},
    };
    const { document, diagnostics, extras } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(extras?.document).toBeInstanceOf(Document);
    expect(diagnostics.length > 0).toEqual(true);
  });

  it('should assign x-parser-api-version extension to the 1 value', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {},
    };
    const { document } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV2);
    expect(document?.extensions().get(xParserApiVersion)?.value()).toEqual(
      ParserAPIVersion,
    );
  });

  it('should preserve references', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'publishOperation',
            message: {
              $ref: '#/components/messages/message',
            },
          },
          subscribe: {
            operationId: 'subscribeOperation',
            message: {
              $ref: '#/components/messages/message',
            },
          },
        },
      },
      components: {
        messages: {
          message: {
            payload: {
              type: 'object',
            },
          },
        },
      },
    };
    const { document } = await parser.parse(documentRaw);

    const publishMessage = document
      ?.channels()
      .get('channel')
      ?.operations()
      .get('publishOperation')
      ?.messages()[0];
    const subscribeMessage = document
      ?.channels()
      .get('channel')
      ?.operations()
      .get('subscribeOperation')
      ?.messages()[0];
    const componentsMessage = document
      ?.components()
      ?.messages()
      ?.get('message');
    expect(publishMessage?.json() !== undefined).toEqual(true);
    expect(subscribeMessage?.json() !== undefined).toEqual(true);
    expect(componentsMessage?.json() !== undefined).toEqual(true);
    expect(componentsMessage?.json() === publishMessage?.json()).toEqual(true);
    expect(componentsMessage?.json() === subscribeMessage?.json()).toEqual(
      true,
    );
    expect(publishMessage?.json() === subscribeMessage?.json()).toEqual(true);
  });

  it('should parse circular references (in this same document)', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'someId',
            message: {
              payload: {
                properties: {
                  nonCircular: {
                    type: 'string',
                  },
                  circular: {
                    $ref: '#/channels/channel/publish/message/payload',
                  },
                },
              },
            },
          },
        },
      },
    };
    const { document } = await parser.parse(documentRaw);

    const messagePayload = document
      ?.channels()
      .get('channel')
      ?.operations()
      .get('someId')
      ?.messages()[0]
      .payload();
    expect(messagePayload?.json() !== undefined).toEqual(true);
    expect(
      messagePayload?.properties()?.['circular'].json() !== undefined,
    ).toEqual(true);
    expect(
      messagePayload?.properties()?.['circular'].json() ===
        messagePayload?.json(),
    ).toEqual(true); // expect that same reference
  });

  it('should parse circular references (in external file)', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'someId',
            message: {
              payload: {
                properties: {
                  nonCircular: {
                    type: 'string',
                  },
                  circular: {
                    $ref: './mocks/parse/circular-ref.yaml',
                  },
                },
              },
            },
          },
        },
      },
    };
    const { document } = await parser.parse(documentRaw, {
      source: __filename,
    });

    const messagePayload = document
      ?.channels()
      .get('channel')
      ?.operations()
      .get('someId')
      ?.messages()[0]
      .payload();
    const circular = messagePayload?.properties()?.['circular'];
    const deepProperty = circular?.properties()?.['deepProperty'];
    const deepCircular = deepProperty?.properties()?.['circular'];
    expect(deepProperty?.json() !== undefined).toEqual(true);
    expect(deepCircular?.json() !== undefined).toEqual(true);
    expect(deepProperty?.json() === deepCircular?.json()).toEqual(true); // expect that same reference
  });

  it('should throw errors when references url does not exist (#224 issue)', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'someId',
            message: {
              payload: {
                $ref: 'http://hopefullu-it-does-not-exist.com/some-file.yaml#/components/schemas/schema',
              },
            },
          },
        },
      },
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    const filteredDiagnostics = diagnostics.filter(
      (d) => d.code === 'invalid-ref',
    );

    expect(document).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
    expect(filteredDiagnostics.length).toEqual(1);
    expect(filteredDiagnostics[0].message).toEqual(
      'FetchError: request to http://hopefullu-it-does-not-exist.com/some-file.yaml failed, reason: getaddrinfo ENOTFOUND hopefullu-it-does-not-exist.com',
    );
  });

  it('should throw errors when local reference does not exist (#360 issue)', async function () {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Invalid AsyncApi document',
        version: '1.0',
      },
      channels: {
        channel: {
          publish: {
            operationId: 'someId',
            message: {
              $ref: '#components/messages/message1',
            },
          },
        },
      },
      components: {
        messages: {
          message1: {
            name: 'unusedMessage',
            title: 'This is most definityly a message.',
          },
        },
      },
    };
    const { document, diagnostics } = await parser.parse(documentRaw);
    const filteredDiagnostics = diagnostics.filter(
      (d) => d.code === 'invalid-ref',
    );

    expect(document).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
    expect(filteredDiagnostics.length).toEqual(1);
    expect(filteredDiagnostics[0].message).toEqual(
      '\'#components/messages/message1\' JSON pointer is invalid',
    );
  });

  it('should parse valid v3 YAML document in \'string\' format', async function () {
    const documentRaw = `
      asyncapi: 3.0.0
      info:
        title: Account Service
        version: 1.0.0
        description: This service is in charge of processing user signups
      channels:
        userSignedup:
          address: user/signedup
          messages:
            UserSignedUp:
              $ref: '#/components/messages/UserSignedUp'
      operations:
        sendUserSignedup:
          action: send
          channel:
            $ref: '#/channels/userSignedup'
          messages:
            - $ref: '#/channels/userSignedup/messages/UserSignedUp'
      components:
        messages:
          UserSignedUp:
            payload:
              type: object
              properties:
                displayName:
                  type: string
                  description: Name of the user
                email:
                  type: string
                  format: email
                  description: Email of the user`;

    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);
  });

  it('should parse valid v3 JSON document in JSON format', async function () {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Account Service',
        version: '1.0.0',
        description: 'This service is in charge of processing user signups',
      },
      channels: {
        userSignedup: {
          address: 'user/signedup',
          messages: {
            UserSignedUp: {
              $ref: '#/components/messages/UserSignedUp',
            },
          },
        },
      },
      operations: {
        sendUserSignedup: {
          action: 'send',
          channel: {
            $ref: '#/channels/userSignedup',
          },
          messages: [
            {
              $ref: '#/channels/userSignedup/messages/UserSignedUp',
            },
          ],
        },
      },
      components: {
        messages: {
          UserSignedUp: {
            payload: {
              type: 'object',
              properties: {
                displayName: {
                  type: 'string',
                  description: 'Name of the user',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email of the user',
                },
              },
            },
          },
        },
      },
    };

    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);
  });

  it('should parse valid v3 JSON document after JSON.stringify()', async function () {
    const documentRaw =
      '{\n  "asyncapi": "3.0.0",\n  "info": {\n    "title": "Account Service",\n    "version": "1.0.0",\n    "description": "This service is in charge of processing user signups"\n  },\n  "channels": {\n    "userSignedup": {\n      "address": "user/signedup",\n      "messages": {\n        "UserSignedUp": {\n          "$ref": "#/components/messages/UserSignedUp"\n        }\n      }\n    }\n  },\n  "operations": {\n    "sendUserSignedup": {\n      "action": "send",\n      "channel": {\n        "$ref": "#/channels/userSignedup"\n      },\n      "messages": [\n        {\n          "$ref": "#/channels/userSignedup/messages/UserSignedUp"\n        }\n      ]\n    }\n  },\n  "components": {\n    "messages": {\n      "UserSignedUp": {\n        "payload": {\n          "type": "object",\n          "properties": {\n            "displayName": {\n              "type": "string",\n              "description": "Name of the user"\n            },\n            "email": {\n              "type": "string",\n              "format": "email",\n              "description": "Email of the user"\n            }\n          }\n        }\n      }\n    }\n  }\n}\n';

    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics.length === 0).toEqual(true);
  });

  it('should not parse invalid v3 YAML document and give error in line 153 (#936)', async function () {
    const documentRaw = `asyncapi: 3.0.0
info:
  title: My Event-Driven API
  version: 1.0.0
  description: This API provides real-time event streaming capabilities.
  termsOfService: https://example.com/terms-of-service
  contact:
    name: Rohit
    email: rohitwashere@asyncapi.com
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
  tags:
    - name: Events
      description: APIs related to event streaming
    - name: Authentication
      description: APIs for authentication and authorization
  externalDocs:
    description: Additional documentation 
    url: https://example.com/docs
servers:
  production:
    host: rabbitmq.in.mycompany.com:5672
    pathname: /v1
    protocol: amqp
    protocolVersion: "1.0"
    description: Production RabbitMQ broker (uses the 'production' vhost).
    title: Production Server
    summary: Production environment server
    security:
      - type: http
        scheme: bearer
    tags:
      - name: production
        description: Production environment
    externalDocs:
      description: Additional documentation for the production server
      url: https://example.com/docs/production
    bindings:
      amqp:
        exchange: my-exchange
        queue: my-queue
  staging:
    host: rabbitmq.in.mycompany.com:5672
    pathname: /v1
    protocol: amqp
    protocolVersion: "1.0"
    description: Staging RabbitMQ broker (uses the 'staging' vhost).
    title: Staging Server
    summary: Staging environment server
    security:
      - type: apiKey
        in: user
        description: Provide your API key as the user and leave the password empty.
    tags:
      - name: staging
        description: Staging environment
    externalDocs:
      description: Additional documentation for the staging server
      url: https://example.com/docs/staging
    bindings:
      amqp:
        exchange: my-exchange
        queue: my-queue
channels:
  user:
    address: 'users.{userId}'
    title: Users channel
    description: This channel is used to exchange messages about user events.
    messages:
      userSignedUp:
        $ref: '#/components/messages/userSignedUp'
      userCompletedOrder:
        $ref: '#/components/messages/userCompletedOrder'
    parameters:
      userId:
        $ref: '#/components/parameters/userId'
    servers:
      - $ref: '#/servers/production'
    bindings:
      amqp:
        is: queue
        queue:
          exclusive: true
    tags:
      - name: user
        description: User-related messages
    externalDocs:
      description: 'Find more info here'
      url: 'https://example.com'
  userSignupReply:
    address: 'users.signup.reply'
    description: Channel for user signup replies
    messages:
      userSignedUpReply:
        summary: User signup reply message
        payload:
          type: object
          properties:
            status:
              type: string
              description: Status of the signup process
            message:
              type: string
              description: Additional information


operations:
  sendUserSignUp:
    action: send
    title: User sign up
    summary: Action to sign a user up.
    description: A longer description
    channel:
      $ref: '#/channels/user'
    security:
      - type: oauth2
        description: The oauth security descriptions
        flows:
          clientCredentials:
            tokenUrl: 'https://example.com/api/oauth/dialog'
            availableScopes:
              'subscribe:auth_revocations': Scope required for authorization revocation topic
        scopes:
          - 'subscribe:auth_revocations'
    tags:
      - name: user
      - name: signup
      - name: register
    bindings:
      amqp:
        ack: false
    messages:
      - $ref: '#/channels/user/messages/userSignedUp'
    reply:
      address:
        location: '$message.header#/replyTo'
      channel:
        $ref: '#/channels/userSignupReply'
      messages:
        - $ref: '#/channels/userSignupReply/messages/userSignedUpReply'
        
components:
  schemas:
    Category:
      type: object
      properties:
        id:
          type: integer
          format: int64
    AvroExample:
      schemaFormat: application/vnd.apache.avro+json;version=1.9.0
      schema:
        $ref: 'path/to/user-create.avsc/#UserCreate'

  servers:
    development:
      host: '{stage}.in.mycompany.com'
      protocol: amqp
      description: RabbitMQ broker
      bindings:
        $ref: '#/components/serverBindings/devAmqp'
      variables:
        stage:
          $ref: '#/components/serverVariables/stage'
      security:
        - $ref: '#/components/securitySchemes/oauth'

  serverVariables:
    stage:
      default: demo
      description: This value is assigned by the service provider in this example of 'mycompany.com'

  channels:
    user:
      address: 'users.{userId}'
      title: Users channel
      description: This channel is used to exchange messages about user events.
      messages:
        userSignedUp:
          $ref: '#/components/messages/userSignUp'
      parameters:
        userId:
          $ref: '#/components/parameters/userId'
      servers:
        - $ref: '#/components/servers/development'
      bindings:
        $ref: '#/components/channelBindings/user'
      tags:
        - $ref: '#/components/tags/user'
      externalDocs:
        $ref: '#/components/externalDocs/infoDocs'

  messages:
    userSignUp:
      summary: Action to sign a user up.
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: '#/components/schemas/Category'
      correlationId:
          $ref: '#/components/correlationIds/default'
      bindings:
        $ref: '#/components/messageBindings/user'
    userSignedUp:
      summary: User signed up event
      contentType: application/json
      payload:
        type: object
        properties:
          userId:
            type: string
            description: The ID of the user
          email:
            type: string
            description: The email of the user
    userCompletedOrder:
      summary: User completed order event
      contentType: application/json
      payload:
        type: object
        properties:
          orderId:
            type: string
            description: The ID of the order
          userId:
            type: string
            description: The ID of the user
          amount:
            type: number
            description: The total amount of the order


  parameters:
    userId:
      description: Id of the user.
      
  correlationIds:
    default:
      description: Default Correlation ID
      location: $message.header#/correlationId

  operations:
    sendUserSignUp:
      action: send
      title: User sign up
      channel:
        $ref: '#/channels/user'
      bindings:
        $ref: '#/components/operationBindings/sendUser'
      traits:
        - $ref: '#/components/operationTraits/binding'
      reply:
        $ref: '#/components/replies/signupReply'  

  replies:
    signupReply:
      address:
        $ref: '#/components/replyAddresses/signupReply'
      channel:
        $ref: '#/channels/userSignupReply'

  replyAddresses:
    signupReply:
      location: '$message.header#/replyTo'


  securitySchemes:
    oauth:
      type: oauth2
      description: The oauth security descriptions
      flows:
        clientCredentials:
          tokenUrl: 'https://example.com/api/oauth/dialog'
          availableScopes:
            'subscribe:auth_revocations': Scope required for authorization revocation topic
      scopes:
        - 'subscribe:auth_revocations'

  operationTraits:
    binding:
      bindings:
        amqp:
          ack: false

  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100

  tags:
    user:
      name: user
      description: User-related messages

  externalDocs:
    infoDocs:
      url: https://example.com/docs
      description: 'Find more info here'

  serverBindings:
    devAmqp:
      amqp:
        exchange: my-exchange
        queue: my-queue

  channelBindings:
    user:
      amqp:
        is: queue
        queue:
          exclusive: true

  operationBindings:
    sendUser:
      amqp:
        ack: false

  messageBindings:
    user:
      amqp:
        contentEncoding: gzip
        messageType: 'user.signup'
        bindingVersion: '0.3.0'`;

    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).not.toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics[0].range.start.line === 153).toEqual(true);
  });

  it('should not parse invalid v3 JSON document and give error in line 236 (#936)', async function () {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'My Event-Driven API',
        version: '1.0.0',
        description:
          'This API provides real-time event streaming capabilities.',
        termsOfService: 'https://example.com/terms-of-service',
        contact: {
          name: 'Rohit',
          email: 'rohitwashere@asyncapi.com',
        },
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
        tags: [
          {
            name: 'Events',
            description: 'APIs related to event streaming',
          },
          {
            name: 'Authentication',
            description: 'APIs for authentication and authorization',
          },
        ],
        externalDocs: {
          description: 'Additional documentation',
          url: 'https://example.com/docs',
        },
      },
      servers: {
        production: {
          host: 'rabbitmq.in.mycompany.com:5672',
          pathname: '/v1',
          protocol: 'amqp',
          protocolVersion: '1.0',
          description:
            'Production RabbitMQ broker (uses the `production` vhost).',
          title: 'Production Server',
          summary: 'Production environment server',
          security: [
            {
              type: 'http',
              scheme: 'bearer',
            },
          ],
          tags: [
            {
              name: 'production',
              description: 'Production environment',
            },
          ],
          externalDocs: {
            description: 'Additional documentation for the production server',
            url: 'https://example.com/docs/production',
          },
          bindings: {
            amqp: {
              exchange: 'my-exchange',
              queue: 'my-queue',
            },
          },
        },
        staging: {
          host: 'rabbitmq.in.mycompany.com:5672',
          pathname: '/v1',
          protocol: 'amqp',
          protocolVersion: '1.0',
          description: 'Staging RabbitMQ broker (uses the `staging` vhost).',
          title: 'Staging Server',
          summary: 'Staging environment server',
          security: [
            {
              type: 'apiKey',
              in: 'user',
              description:
                'Provide your API key as the user and leave the password empty.',
            },
          ],
          tags: [
            {
              name: 'staging',
              description: 'Staging environment',
            },
          ],
          externalDocs: {
            description: 'Additional documentation for the staging server',
            url: 'https://example.com/docs/staging',
          },
          bindings: {
            amqp: {
              exchange: 'my-exchange',
              queue: 'my-queue',
            },
          },
        },
      },
      channels: {
        user: {
          address: 'users.{userId}',
          title: 'Users channel',
          description:
            'This channel is used to exchange messages about user events.',
          messages: {
            userSignedUp: {
              $ref: '#/components/messages/userSignedUp',
            },
            userCompletedOrder: {
              $ref: '#/components/messages/userCompletedOrder',
            },
          },
          parameters: {
            userId: {
              $ref: '#/components/parameters/userId',
            },
          },
          servers: [
            {
              $ref: '#/servers/production',
            },
          ],
          bindings: {
            amqp: {
              is: 'queue',
              queue: {
                exclusive: true,
              },
            },
          },
          tags: [
            {
              name: 'user',
              description: 'User-related messages',
            },
          ],
          externalDocs: {
            description: 'Find more info here',
            url: 'https://example.com',
          },
        },
        userSignupReply: {
          address: 'users.signup.reply',
          description: 'Channel for user signup replies',
          messages: {
            userSignedUpReply: {
              summary: 'User signup reply message',
              payload: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    description: 'Status of the signup process',
                  },
                  message: {
                    type: 'string',
                    description: 'Additional information',
                  },
                },
              },
            },
          },
        },
      },
      operations: {
        sendUserSignUp: {
          action: 'send',
          title: 'User sign up',
          summary: 'Action to sign a user up.',
          description: 'A longer description',
          channel: {
            $ref: '#/channels/user',
          },
          security: [
            {
              type: 'oauth2',
              description: 'The oauth security descriptions',
              flows: {
                clientCredentials: {
                  tokenUrl: 'https://example.com/api/oauth/dialog',
                  availableScopes: {
                    'subscribe:auth_revocations':
                      'Scope required for authorization revocation topic',
                  },
                },
              },
              scopes: ['subscribe:auth_revocations'],
            },
          ],
          tags: [
            {
              name: 'user',
            },
            {
              name: 'signup',
            },
            {
              name: 'register',
            },
          ],
          bindings: {
            amqp: {
              ack: false,
            },
          },
          messages: [
            {
              $ref: '#/channels/user/messages/userSignedUp',
            },
          ],
          reply: {
            address: {
              location: '$message.header#/replyTo',
            },
            channel: {
              $ref: '#/channels/userSignupReply',
            },
            messages: [
              {
                $ref: '#/channels/userSignupReply/messages/userSignedUpReply',
              },
            ],
          },
        },
      },
      components: {
        schemas: {
          Category: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
            },
          },
          AvroExample: {
            schemaFormat: 'application/vnd.apache.avro+json;version=1.9.0',
            schema: {
              $ref: 'path/to/user-create.avsc/#UserCreate',
            },
          },
        },
        servers: {
          development: {
            host: '{stage}.in.mycompany.com',
            protocol: 'amqp',
            description: 'RabbitMQ broker',
            bindings: {
              $ref: '#/components/serverBindings/devAmqp',
            },
            variables: {
              stage: {
                $ref: '#/components/serverVariables/stage',
              },
            },
            security: [
              {
                $ref: '#/components/securitySchemes/oauth',
              },
            ],
          },
        },
        serverVariables: {
          stage: {
            default: 'demo',
            description:
              'This value is assigned by the service provider in this example of `mycompany.com`',
          },
        },
        channels: {
          user: {
            address: 'users.{userId}',
            title: 'Users channel',
            description:
              'This channel is used to exchange messages about user events.',
            messages: {
              userSignedUp: {
                $ref: '#/components/messages/userSignUp',
              },
            },
            parameters: {
              userId: {
                $ref: '#/components/parameters/userId',
              },
            },
            servers: [
              {
                $ref: '#/components/servers/development',
              },
            ],
            bindings: {
              $ref: '#/components/channelBindings/user',
            },
            tags: [
              {
                $ref: '#/components/tags/user',
              },
            ],
            externalDocs: {
              $ref: '#/components/externalDocs/infoDocs',
            },
          },
        },
        messages: {
          userSignUp: {
            summary: 'Action to sign a user up.',
            traits: [
              {
                $ref: '#/components/messageTraits/commonHeaders',
              },
            ],
            payload: {
              $ref: '#/components/schemas/Category',
            },
            correlationId: {
              $ref: '#/components/correlationIds/default',
            },
            bindings: {
              $ref: '#/components/messageBindings/user',
            },
          },
          userSignedUp: {
            summary: 'User signed up event',
            contentType: 'application/json',
            payload: {
              type: 'object',
              properties: {
                userId: {
                  type: 'string',
                  description: 'The ID of the user',
                },
                email: {
                  type: 'string',
                  description: 'The email of the user',
                },
              },
            },
          },
          userCompletedOrder: {
            summary: 'User completed order event',
            contentType: 'application/json',
            payload: {
              type: 'object',
              properties: {
                orderId: {
                  type: 'string',
                  description: 'The ID of the order',
                },
                userId: {
                  type: 'string',
                  description: 'The ID of the user',
                },
                amount: {
                  type: 'number',
                  description: 'The total amount of the order',
                },
              },
            },
          },
        },
        parameters: {
          userId: {
            description: 'Id of the user.',
          },
        },
        correlationIds: {
          default: {
            description: 'Default Correlation ID',
            location: '$message.header#/correlationId',
          },
        },
        operations: {
          sendUserSignUp: {
            action: 'send',
            title: 'User sign up',
            channel: {
              $ref: '#/channels/user',
            },
            bindings: {
              $ref: '#/components/operationBindings/sendUser',
            },
            traits: [
              {
                $ref: '#/components/operationTraits/binding',
              },
            ],
            reply: {
              $ref: '#/components/replies/signupReply',
            },
          },
        },
        replies: {
          signupReply: {
            address: {
              $ref: '#/components/replyAddresses/signupReply',
            },
            channel: {
              $ref: '#/channels/userSignupReply',
            },
          },
        },
        replyAddresses: {
          signupReply: {
            location: '$message.header#/replyTo',
          },
        },
        securitySchemes: {
          oauth: {
            type: 'oauth2',
            description: 'The oauth security descriptions',
            flows: {
              clientCredentials: {
                tokenUrl: 'https://example.com/api/oauth/dialog',
                availableScopes: {
                  'subscribe:auth_revocations':
                    'Scope required for authorization revocation topic',
                },
              },
            },
            scopes: ['subscribe:auth_revocations'],
          },
        },
        operationTraits: {
          binding: {
            bindings: {
              amqp: {
                ack: false,
              },
            },
          },
        },
        messageTraits: {
          commonHeaders: {
            headers: {
              type: 'object',
              properties: {
                'my-app-header': {
                  type: 'integer',
                  minimum: 0,
                  maximum: 100,
                },
              },
            },
          },
        },
        tags: {
          user: {
            name: 'user',
            description: 'User-related messages',
          },
        },
        externalDocs: {
          infoDocs: {
            url: 'https://example.com/docs',
            description: 'Find more info here',
          },
        },
        serverBindings: {
          devAmqp: {
            amqp: {
              exchange: 'my-exchange',
              queue: 'my-queue',
            },
          },
        },
        channelBindings: {
          user: {
            amqp: {
              is: 'queue',
              queue: {
                exclusive: true,
              },
            },
          },
        },
        operationBindings: {
          sendUser: {
            amqp: {
              ack: false,
            },
          },
        },
        messageBindings: {
          user: {
            amqp: {
              contentEncoding: 'gzip',
              messageType: 'user.signup',
              bindingVersion: '0.3.0',
            },
          },
        },
      },
    };

    const { document, diagnostics } = await parser.parse(documentRaw);

    expect(document).not.toBeInstanceOf(AsyncAPIDocumentV3);
    expect(diagnostics[0].range.start.line === 236).toEqual(true);
  });
});
