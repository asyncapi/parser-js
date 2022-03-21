import { Server } from '../../../src/models/v2/server';
import { Servers } from '../../../src/models/v2/servers';

import {
    assertBindingsMixinInheritance,
    assertDescriptionMixinInheritance,
} from './mixins/inheritance';

const doc = {
    id: 'id',
    name: 'development',
    protocol: 'mqtt',
    protocolVersion: '1.0.0',
    url: 'development.gigantic-server.com'
};
const docItem = new Server(doc);
const emptyItem = new Server({});

describe('Servers model', function () {
    describe('.isEmpty()', function () {
        it('should return true if collection is empty', function () {
            const servers = new Servers([]);
            expect(servers.isEmpty()).toBeTruthy();
        });

        it('should return false if collection is not empty', function () {
            const servers = new Servers([docItem]);
            expect(servers.isEmpty()).toBeFalsy();
        });
    })

    describe('.get(id)', function () {
        it('should return a specific server Object if it is present', function () {
            const servers = new Servers([docItem]);
            expect(servers.get('id')).toBeTruthy();
        });

        it('should return undefined if a server is said Id is missing ', function () {
            const servers = new Servers([]);
            expect(servers.get('id')).toBeUndefined();
        });
    })

    describe('.has(id)', function () {

        const servers = new Servers([docItem]);

        it('should return true if the said Id is available', function () {
            expect(servers.has('id')).toBeTruthy();
        })

        it('should return fase id the said id is missing', function () {
            expect(servers.has('uid')).toBeFalsy();
        })
    })
})

describe('Server Model', function () {

    describe('.id()', function () {
        it('should return id', function () {
            expect(docItem.id()).toMatch('id');
        })
    })

    describe('.hasName()', function () {
        it('should return true if name is present', function () {
            expect(docItem.hasName()).toBeTruthy();
        })

        it('should return false if name is not present', function () {
            expect(emptyItem.hasName()).toBeFalsy();
        })
    })

    describe('.name()', function () {
        it('should return name if present', function () {
            expect(docItem.name()).toMatch(doc.name);
        })

        it('should return undefined if name is not present', function () {
            expect(emptyItem.name()).toBeUndefined();
        })
    })

    describe('.hasProtocol()', function () {
        it('should return true if protocol is present', function() {
            expect(docItem.hasProtocol()).toBeTruthy();
        })

        it('should return false if protocol is not present', function(){
            expect(emptyItem.hasProtocol()).toBeFalsy();
        })
    })

    describe('protocol()', function () {
        it('should return protocol ', function() {
            expect(docItem.protocol()).toMatch(doc.protocol);
        })

        it('should return undefined when protocol is missing', function() {
            expect(emptyItem.protocol()).toBeUndefined();
        })
    })

    describe('.hasProtocolVersion()', function () {
        it('should return true if protocolVersion is not missing', function() {
            expect(docItem.hasProtocolVersion()).toBeTruthy();
        })

        it('should be false when protocolVersion is missing', function() {
            expect(emptyItem.hasProtocolVersion()).toBeFalsy();
        })
    })

    describe('.protocolVersion()', function () {
        it('should return protocolVersion', function() {
            expect(docItem.protocolVersion()).toMatch(doc.protocolVersion);
        })

        it('should return undefined protocolVersion when protocolVersion is missing', function() {
            expect(emptyItem.protocolVersion()).toBeUndefined();
        })
    })

    describe('.hasUrl()', function () {
        it('should return true if url is not missing', function(){
            expect(docItem.hasUrl()).toBeTruthy();
        })

        it('should return false when url is missing', function() { 
            expect(emptyItem.hasUrl()).toBeFalsy();
        })
    })

    describe('.url()', function () {
        it('should return url', function(){
            expect(docItem.url()).toMatch(doc.url);
        })

        it('should return undefined when url is missing', function() {
            expect(emptyItem.url()).toBeUndefined();
        })
    })

    describe('mixins inheritance', function () {
        assertDescriptionMixinInheritance(Server);
        assertBindingsMixinInheritance(Server);
    })
})