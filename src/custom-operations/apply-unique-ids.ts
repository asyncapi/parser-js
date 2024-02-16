import { xParserObjectUniqueId } from '../constants';

/**
 * This function applies unique ids for objects whose key's function as ids, ensuring that the key is part of the value.
 * 
 * For v3; Apply unique ids to all channel's, operations, and message's.
 * 
 * Does not apply unique ids to $ref objects
 */
export function applyUniqueIds(structure: any) {
  const asyncapiVersion = structure.asyncapi.charAt(0);
  switch (asyncapiVersion) {
  case '3':
    applyUniqueIdToChannels(structure.channels);
    applyUniqueIdToObjects(structure.operations);
    if (structure.components) {
      applyUniqueIdToObjects(structure.components.messages);
      applyUniqueIdToObjects(structure.components.operations);
      applyUniqueIdToChannels(structure.components.channels);
    }
    break;
  }
}

function applyUniqueIdToChannels(channels: any) {
  for (const [channelId, channel] of Object.entries((channels ?? {}) as Record<string, any>)) {
    if (!channel.$ref) {
      channel[xParserObjectUniqueId] = channelId;
    }
    for (const [messageId, message] of Object.entries((channel.messages ?? {}) as Record<string, any>)) {
      if (!message.$ref) {
        message[xParserObjectUniqueId] = messageId;
      }
    }
  }
}

function applyUniqueIdToObjects(objects: any) {
  for (const [objectKey, object] of Object.entries((objects ?? {}) as Record<string, any>)) {
    if (!object.$ref) {
      object[xParserObjectUniqueId] = objectKey;
    }
  }
}
