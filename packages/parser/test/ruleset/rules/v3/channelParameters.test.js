const { testRule } = require('some-testing-library');

testRule('asyncapi3-channel-parameters', {
  valid: [
    {
      name: 'Valid channel with parameters in address',
      document: {
        asyncapi: '3.0.0',
        channels: {
          userSignedup: {
            address: 'user/{id}',
            parameters: {
              id: { description: 'User ID' }
            }
          }
        }
      }
    }
  ],
  invalid: [
    {
      name: 'Parameters exist but address is null',
      document: {
        asyncapi: '3.0.0',
        channels: {
          userSignedup: {
            address: null,
            parameters: {
              id: { description: 'User ID' }
            }
          }
        }
      },
      errors: [{ message: 'Channel has parameters but no valid address.' }]
    },
    {
      name: 'Parameters exist but not in address',
      document: {
        asyncapi: '3.0.0',
        channels: {
          userSignedup: {
            address: 'user/signedup',
            parameters: {
              id: { description: 'User ID' }
            }
          }
        }
      },
      errors: [{ message: 'Channel address is missing parameters: id' }]
    }
  ]
});
