import { createRulesetFunction } from '@stoplight/spectral-core';
export const channelServers = createRulesetFunction({
    input: {
        type: 'object',
        properties: {
            servers: {
                type: 'object',
            },
            channels: {
                type: 'object',
                additionalProperties: {
                    type: 'object',
                    properties: {
                        servers: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
    },
    options: null,
}, (targetVal) => {
    var _a, _b;
    const results = [];
    if (!targetVal.channels)
        return results;
    const serverNames = Object.keys((_a = targetVal.servers) !== null && _a !== void 0 ? _a : {});
    Object.entries((_b = targetVal.channels) !== null && _b !== void 0 ? _b : {}).forEach(([channelAddress, channel]) => {
        if (!channel.servers)
            return;
        channel.servers.forEach((serverName, index) => {
            if (!serverNames.includes(serverName)) {
                results.push({
                    message: 'Channel contains server that are not defined on the "servers" object.',
                    path: ['channels', channelAddress, 'servers', index],
                });
            }
        });
    });
    return results;
});
