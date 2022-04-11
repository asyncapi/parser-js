import {SecurityScheme} from '../../../src/models/v2/security-scheme';

const doc1 = {
    type: 'http',
    in: 'header',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    openIdConnectUrl: 'https://server.com/.well-known/openid-configuration'
}

const sc1 = new SecurityScheme('api_key', doc1);
const emptyItem = new SecurityScheme('', {});

describe('Security Scheme', function(){
    describe('.id()', function(){
        it('should return name if present', function(){
            expect(sc1.id()).toMatch('api_key');
        });
    })

    describe('.type()', function() {
        it('should return type when it is present', function() {
            expect(sc1.type()).toMatch(doc1.type);
        })
    })

    describe('.hasBearerFormat()', function() {
        it('should return true if bearerFormat is present', function() {
            expect(sc1.hasBearerFormat()).toBeTruthy();
        })

        it('should return false if bearerFormat is not present', function() {
            expect(emptyItem.hasBearerFormat()).toBeFalsy();
        })
    })

    describe('.in()', function() {
        it('should return in if present', function(){
            expect(sc1.in()).toMatch(doc1.in);
            expect(emptyItem.in()).toBeUndefined();
        })
    })

    describe('.openIdConnectUrl()', function(){
        it('should return openIdConnectUrl value', function() {
            expect(sc1.openIdConnectUrl()).toMatch(doc1.openIdConnectUrl);
        })
    })
})
