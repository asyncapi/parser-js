import { BaseModel } from '../base';
import { SecurityScheme } from './security-scheme';
import { ServerVariables } from './server-variables';
import { ServerVariable } from './server-variable';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import type { ModelMetadata } from "../base";
import type { ServerInterface } from '../server';
import type { ServerVariablesInterface } from '../server-variables';
import type { SecuritySchemeInterface } from '../security-scheme';

export class Server extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, ExtensionsMixin) implements ServerInterface {
  constructor(
    _json: Record<string, any>,
    protected readonly _meta: ModelMetadata & { id: string } = {} as any,
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this._meta.id;
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

  security(): Array<Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }>> {
    const securitySchemes = this._meta?.asyncapi?.parsed.components.securitySchemes || {};
    return (this._json.security || []).map((requirement: any) => {
      const requirements: Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }> = {};
      Object.entries(requirement).forEach(([security, scopes]) => {
        requirements[security] = {
          schema: this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` }),
          scopes: scopes as Array<string>,
        }
      });
      return requirements;
    })
  }
}
