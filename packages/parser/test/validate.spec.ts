import { AsyncAPIDocument } from '../src/models/v3/asyncapi';
import { Parser } from '../src/parser';
import { hasErrorDiagnostic, hasWarningDiagnostic } from '../src/utils';
import { filterLastVersionDiagnostics } from './utils';

describe('validate()', function() {
  const parser = new Parser();

  it('should validate invalid document', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
    };
    const diagnostics = await parser.validate(documentRaw);

    expect(diagnostics.length > 0).toEqual(true);
    expect(hasErrorDiagnostic(diagnostics)).toEqual(true);
    expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
  });

  it('should validate valid document', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {}
    };
    const diagnostics = await parser.validate(documentRaw);
    
    expect(diagnostics.length > 0).toEqual(true);
    expect(hasErrorDiagnostic(diagnostics)).toEqual(false);
    expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
  });

  it('should validate valid document - do not allow warning severity', async function() {
    const documentRaw = {
      asyncapi: '2.0.0',
      info: {
        title: 'Valid AsyncApi document',
        version: '1.0',
      },
      channels: {}
    };
    const { document, diagnostics } = await parser.parse(documentRaw, { validateOptions: { allowedSeverity: { warning: false } } });
    
    expect(document).toBeUndefined();
    expect(diagnostics.length > 0).toEqual(true);
    expect(hasErrorDiagnostic(diagnostics)).toEqual(false);
    expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
  });

  // See https://github.com/asyncapi/parser-js/issues/996
  it.only('user case - null channel address should not make operation traits appliance fail', async function() {
    const documentRaw = {
      asyncapi: '3.0.0',
      info: {
        title: 'Nexus Server API',
        version: '1.0.0'
      },
      channels: {
        Exchange: {
          address: null,
          messages: {
            FooEvent: {
              name: 'FooEvent',
              title: 'Tenant Created',
              contentType: 'application/json',
              payload: {
                type: 'string'
              }
            }
          }
        }
      },
      operations: {
        sendTenantCreated: {
          title: 'Send tenant created event to client',
          action: 'send',
          channel: {
            $ref: '#/channels/Exchange'
          },
          messages: [
            {
              $ref: '#/channels/Exchange/messages/FooEvent'
            }
          ]
        }
      }
    };
    const { document, diagnostics } = await parser.parse(documentRaw, { validateOptions: { allowedSeverity: { warning: false } } });

    expect(document).toBeInstanceOf(AsyncAPIDocument);
    expect(filterLastVersionDiagnostics(diagnostics)).toHaveLength(0);
  });
});
