import { BaseModel } from '../base';
import { Channels } from '../channels';
import { Channel } from './channel';
import { Operations } from '../operations';
import { Operation } from './operation';

import { extensions } from './mixins';
import { tilde } from '../../utils';

import type { AsyncAPIDocumentInterface } from '../asyncapi';
import type { ChannelsInterface } from '../channels';
import type { OperationsInterface } from '../operations';

import type { v3 } from '../../spec-types';

export class AsyncAPIDocument extends BaseModel<v3.AsyncAPIObject> implements AsyncAPIDocumentInterface {
  version(): string {
    return this._json.asyncapi;
  }

  defaultContentType(): string | undefined {
    return this._json.defaultContentType;
  }

  hasDefaultContentType(): boolean {
    return !!this._json.defaultContentType;
  }

  info() {
    return null as any;
  }

  servers() {
    return null as any;
  }

  channels(): ChannelsInterface {
    return new Channels(
      Object.entries(this._json.channels || {}).map(([channelId, channel]) =>
        this.createModel(Channel, channel, { id: channelId, pointer: `/channels/${tilde(channelId)}` })
      )
    );
  }

  operations(): OperationsInterface {    
    return new Operations(
      Object.entries(this._json.operations || {}).map(([operationId, operation]) =>
        this.createModel(Operation, operation, { id: operationId, pointer: `/operations/${tilde(operationId)}` })
      )
    );
  }

  messages() {
    return null as any;
  }

  schemas() {
    return null as any;
  }

  securitySchemes() {
    return null as any;
  }

  components() {
    return null as any;
  }

  extensions() {
    return extensions(this);
  }
}
