import { BaseModel } from '../base';
import { SecurityScheme } from './security-scheme';
import { ServerVariable } from './server-variable';
import { ServerVariables } from './server-variables';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import type { ModelMetadata } from "../base";
import type { ServerInterface } from '../server';
import type { SecuritySchemeInterface } from '../security-scheme';

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

  variables(): ServerVariables {
    return new ServerVariables(
      Object.entries(
        this._json.variables
      ).map(
        ([serverVariableName, serverVariable]) => this.createModel(
          ServerVariable, serverVariable, {
          id: serverVariableName,
          pointer: `${this._meta.pointer}/variables/${serverVariableName}`
        }
        )
      ))
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
