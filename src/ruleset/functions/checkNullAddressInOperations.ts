import { IFunction, IFunctionResult } from '@stoplight/spectral-core';
import { IAsyncAPIOperation, IAsyncAPIChannel } from '@stoplight/types';
import { Operations } from 'models/v2/operations';

const checkNullAddressInOperations: IFunction = (document, opts) => {
  const results: IFunctionResult[] = [];

  const channels: Record<string, IAsyncAPIChannel> = document.channels ?? {};

  for(const channelKey in channels){
    const channel = channels[channelKey];

    //check if channel has operation defined
    if(channel.operations) {
      for(const operationKey in channel.operations) {
        const operation = channel.operations[operationKey];

        //check if the operation defines a reply and the channel is null or undefined
        if(operation.reply && (!channel.address || channel.address === 'null')) {
          results.push({
            message: `Channel "${channelKey}" associated with operation "${operationKey}" has a null or undefined address.`,
            path: ['channels', channelKey, 'operations', operationKey, 'reply'],
            severity: 'error'
          })
        }
      }
    }
  }
  return results;
}

export default checkNullAddressInOperations;