import { BaseModel } from '../base';
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';
import { ServerVariables } from './server-variables';
import { ServerVariable } from './server-variable';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import type { ModelMetadata } from "../base";
import type { ServerInterface } from '../server';
import type { ServerVariablesInterface } from '../server-variables';
import type { SecurityRequirementsInterface } from '../security-requirements';

export class Server extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, ExtensionsMixin) implements ServerInterface {
  constructor(
    private readonly _id: string,
    _json: Record<string, any>,
    _meta: ModelMetadata = {} as any,
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this._id;
  }

  url(): string {
    return this._json.url;
  }

  protocol(): string {
    return this._json.protocol;
  }

  hasProtocolVersion(): boolean {
    return !!this._json.protocolVersion;
  }

  protocolVersion(): string {
    return this._json.protocolVersion;
  }

  variables(): ServerVariablesInterface {
    return new ServerVariables(
      Object.entries(this._json.variables || {}).map(([serverVariableName, serverVariable]) => {
        return this.createModel(ServerVariable, serverVariable, {
          id: serverVariableName,
          pointer: `${this._meta.pointer}/variables/${serverVariableName}`
        })
      })
    );
  }

  security(): SecurityRequirementsInterface {
    return new SecurityRequirements((this._json.security || []).map((security: any, index: number) => {
      return this.createModel(SecurityRequirement, security, { pointer: `${this._meta.pointer}/security/${index}` })
    }));
  }
}
