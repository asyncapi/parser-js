import { OAuthFlow } from '../../../src/models/v2/oauth-flow';

const flowObject = {
    "authorizationUrl": "https://example.com/api/oauth/dialog",
    "scopes": {
        "write:pets": "modify pets in your account",
        "read:pets": "read your pets"
    }
}

const flow = new OAuthFlow(flowObject);
const emptyObject = new OAuthFlow({});


describe('OAuth Flow', function(){
    describe('.authorizationUrl()', function(){
        it('should reutrn undefined if no authorizationUrl present', function(){
            expect(emptyObject.authorizationUrl()).toBeUndefined();
        })
        
        it('should return authrozationUrl ', function(){
            expect(flow.authorizationUrl()).toMatch(flowObject.authorizationUrl);
        })
    })

    describe('.scopes()', function() {
        it('should return scopes if present', function() {
            expect(emptyObject.scopes()).toBeUndefined();
            expect(flow.scopes()['write:pets']).toMatch(flowObject.scopes['write:pets']);
        })
    })


})