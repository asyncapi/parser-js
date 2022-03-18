import { ServerV2, ServerVariableV2 } from '../../../src/models';

const doc1 = {}
const doc2 = {
    "url": "development.gigantic-server.com",
    "description": "Development server",
    "protocol": "kafka",
    "protocolVersion": "1.0.0",
    "variables": {
        "username": {
          "default": "demo",
          "description": "This value is assigned by the service provider, in this example `gigantic-server.com`"
        },
        "port": {
          "enum": [
            "8883",
            "8884"
          ],
          "default": "8883"
        },
        "basePath": {
          "default": "v2"
        }
      }
}

const d1 = new ServerV2(doc1);
const d2 = new ServerV2(doc2);

describe('Server model', function () {
    describe('.url()', function () {
        it('should return the url', function () {
            expect(d2.url()).toMatch(doc2.url);
        });

        it('should return undefined when tere is no value', function () {
            expect(d1.url()).toBeUndefined();
        });
    });

    describe('.protocol()', function () {
        it('should return the value', function () {
            expect(d2.protocol()).toMatch(doc2.protocol);
        });

        it('should return undefined when there is no value', function () {
            expect(d1.protocol()).toBeUndefined();
        });
    });

    describe('.hasProtocol()', function(){
        it('should return true if is there is protocol', function(){
            expect(d2.hasProtocol()).toBeTruthy();
        });

        it('should return false if there is no protocol', function(){
            expect(d1.hasProtocol()).toBeFalsy();
        });
    });

    describe('.protocolVersion()', function() {
        it('should return the value', function() {
            expect(d2.protocolVersion()).toMatch(doc2.protocolVersion);
        });

        it('should return undefined when there is no value', function(){
            expect(d1.protocolVersion()).toBeUndefined();
        });
    });

    describe('.hasProtocolVersion()', function(){
        it('should return true if there is protocolVersion', function(){
            expect(d2.hasProtocolVersion()).toBeTruthy();
        });

        it('should return false if there is no protocolVersion', function() {
            expect(d1.hasProtocolVersion()).toBeFalsy();
        });
    });

})