import {ServerVariable} from '../../../src/models/v2/server-variable';

const doc = {
    default: 'demo',
}

const sv = new ServerVariable('username', doc);

describe('server variable ', function() {
    describe('.id()', function() {
        expect(sv.id()).toMatch('username');
    })

    describe('.hasDefaultValue()', function() {
        it('should return true if default value is passed', function(){
            expect(sv.hasDefaultValue()).toBeTruthy();
        })
    })

    describe('.defaultValue()', function(){
        it('shoudl return default value', function() {
            expect(sv.defaultValue()).toMatch(doc.default);
        })
    })
})