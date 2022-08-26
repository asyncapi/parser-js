import { SecurityScheme } from '../../../src/models/v2/security-scheme';
import { OAuthFlows } from '../../../src/models/v2/oauth-flows';

import type { v2 } from '../../../src/interfaces';

const doc1: v2.SecuritySchemeObject = {
    type: 'http',
    in: 'header',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    openIdConnectUrl: 'https://server.com/.well-known/openid-configuration',
    flows: {
        implicit: {
            authorizationUrl: "https://example.com/api/oauth/dialog",
            scopes: {
                "write:pets": "modify pets in your account",
                "read:pets": "read your pets"
            }
        }
    }
}

const sc1 = new SecurityScheme(doc1, { asyncapi: {} as any, pointer: '', id: 'api_key' });
const emptyItem = new SecurityScheme({ type: 'X509' });

describe('Security Scheme', function () {
    describe('.id()', function () {
        it('should return name if present', function () {
            expect(sc1.id()).toMatch('api_key');
        });
    })

    describe('.type()', function () {
        it('should return type when it is present', function () {
            expect(sc1.type()).toMatch(doc1.type);
        })
    })

    describe('.hasBearerFormat()', function () {
        it('should return true if bearerFormat is present', function () {
            expect(sc1.hasBearerFormat()).toBeTruthy();
        })

        it('should return false if bearerFormat is not present', function () {
            expect(emptyItem.hasBearerFormat()).toBeFalsy();
        })
    })

    describe('.in()', function () {
        it('should return in if present', function () {
            expect(sc1.in()).toMatch(doc1.in as string);
            expect(emptyItem.in()).toBeUndefined();
        })
    })

    describe('.openIdConnectUrl()', function () {
        it('should return openIdConnectUrl value', function () {
            expect(sc1.openIdConnectUrl()).toMatch(doc1.openIdConnectUrl as string);
        })
    })
    describe('.flows()', function () {
        it('should return undefined if flow object is not present', function () {
            expect(emptyItem.flows()).toBeUndefined();
        });

        it('should return OAuthFlows object', function() {
            expect(sc1.flows() instanceof OAuthFlows).toBeTruthy();
        })
    })
})
