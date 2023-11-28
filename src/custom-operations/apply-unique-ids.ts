import { xParserObjectUniqueId } from '../constants';

/**
 * This function applies unique ids for objects whose key's function as ids, ensuring that the key is part of the value.
 * 
 * For v3; Apply unique ids to channel's, and message's
 */
export function applyUniqueIds(structure: any) {
  const asyncapiVersion = structure.asyncapi.charAt(0);
  switch (asyncapiVersion) {
  case '3':
    if (structure.channels) {
      for (const [channelId, channel] of Object.entries(structure.channels as Record<string, any>)) {
        channel[xParserObjectUniqueId] = channelId;
        if (channel.messages) {
          for (const [messageId, message] of Object.entries(channel.messages as Record<string, any>)) {
            message[xParserObjectUniqueId] = messageId; 
          }
        }
      }
    }
    break;
  }
}
  