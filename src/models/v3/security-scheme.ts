import { BaseModel } from '../base';
import { OAuthFlows } from './oauth-flows';

import { hasDescription, description, extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { SecuritySchemeInterface } from '../security-scheme';
import type { OAuthFlowsInterface } from '../oauth-flows';

import type { v3 } from '../../spec-types';

export class SecurityScheme extends BaseModel<v3.SecuritySchemeObject, { id: string }> implements SecuritySchemeInterface {
  id(): string {
    return this._meta.id;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasBearerFormat(): boolean {
    return !!this._json.bearerFormat;
  }

  bearerFormat(): string | undefined {
    return this._json.bearerFormat;
  }

  openIdConnectUrl(): string | undefined {
    return this._json.openIdConnectUrl;
  }

  scheme(): string | undefined {
    return this._json.scheme;
  }

  flows(): OAuthFlowsInterface | undefined {
    if (!this._json.flows) return undefined;
    return new OAuthFlows(this._json.flows);
  }

  type(): v3.SecuritySchemeType {
    return this._json.type;
  }

  in(): v3.SecuritySchemaLocation | undefined {
    return this._json.in;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
