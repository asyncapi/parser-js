import { BaseModel } from '../base';
import { Channel } from './channel';
import { Message } from './message';
import { Messages } from '../messages';
import { MessagesInterface } from 'models/messages';
import { OperationReplyAddress } from './operation-reply-address';

import { extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { OperationReplyInterface } from '../operation-reply';
import type { OperationReplyAddressInterface } from '../operation-reply-address';
import type { ChannelInterface } from '../channel';

import type { v3 } from '../../spec-types';

export class OperationReply extends BaseModel<v3.OperationReplyObject, { id?: string }> implements OperationReplyInterface {
  id(): string | undefined {
    return this._meta.id;
  }

  hasAddress(): boolean {
    return !!this._json.address;
  }

  address(): OperationReplyAddressInterface | undefined {
    if (this._json.address) {
      return this.createModel(OperationReplyAddress, this._json.address as v3.OperationReplyAddressObject, { pointer: this.jsonPath('address') });
    }
  }

  hasChannel(): boolean {
    return !!this._json.channel;
  }

  channel(): ChannelInterface | undefined {
    if (this._json.channel) {
      return this.createModel(Channel, this._json.channel as v3.ChannelObject, { id: '', pointer: this.jsonPath('channel') });
    }
    return this._json.channel;
  }
  messages(): MessagesInterface {
    return new Messages(
      Object.entries(this._json.messages || {}).map(([messageName, message]) => {
        return this.createModel(Message, message, { id: messageName, pointer: this.jsonPath(`messages/${messageName}`) });
      })
    );
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
