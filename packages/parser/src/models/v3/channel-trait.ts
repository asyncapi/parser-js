import { ChannelParameters } from './channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Servers } from './servers';
import { Server } from './server';
import { CoreModel } from './mixins';

import type { ChannelTraitInterface } from '../channel-trait';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';
import type { v3 } from '../../spec-types';

export class ChannelTrait<J extends v3.ChannelTraitObject = v3.ChannelTraitObject> extends CoreModel<J, { id: string }> implements ChannelTraitInterface {
  id(): string {
    return this._meta.id;
  }

  servers(): ServersInterface {
    const servers: ServerInterface[] = [];
    const allowedServers = this._json.servers ?? [];
    Object.entries(this._meta.asyncapi?.parsed.servers ?? {}).forEach(([serverName, server]) => {
      if (allowedServers.length === 0 || allowedServers.includes(server)) {
        servers.push(this.createModel(Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
      }
    });
    return new Servers(servers);
  }

  parameters(): ChannelParametersInterface {
    return new ChannelParameters(
      Object.entries(this._json.parameters ?? {}).map(([channelParameterName, channelParameter]) => {
        return this.createModel(ChannelParameter, channelParameter as v3.ParameterObject, {
          id: channelParameterName,
          pointer: this.jsonPath(`parameters/${channelParameterName}`),
        });
      })
    );
  }
}
