import { ServerV2 } from '../../../src/models';

describe('Server model', function () {
    describe('.url()', function () {
        it('should return the url', function () {
            const doc = { url: "https://github.com/asyncapi" };
            const d = new ServerV2(doc);
            expect(d.url()).toMatch(doc.url);
        });

        it('should return undefined when tere is no value', function(){
            const doc = {};
            const d = new ServerV2(doc);
            expect(d.url()).toBeUndefined();
        });
    });

    describe('.protocol()', function(){
        it('should return the value', function(){
            const doc = {protocol: 'http'};
            const d = new ServerV2(doc);
            expect(d.protocol()).toMatch('http');
        });
        it('should return undefined when there is no value', function(){
            const doc = {};
            const d = new ServerV2(doc);
            expect(d.protocol()).toBeUndefined()
        })
    });
})