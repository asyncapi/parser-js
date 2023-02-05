import { BaseModel } from '../base';
import { OAuthFlows } from './oauth-flows';

import { hasDescription, description, extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { SecuritySchemeInterface } from '../security-scheme';
import type { OAuthFlowsInterface } from '../oauth-flows';

import type { v2 } from '../../spec-types';

export class SecurityScheme extends BaseModel<v2.SecuritySchemeObject, { id: string }> implements SecuritySchemeInterface {
  id(): string {
    return this._meta.id;
  }

  type(): v2.SecuritySchemeType {
    return this._json.type;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasName(): boolean {
    return !!this._json.name;
  }

  name(): string | undefined {
    return this._json.name;
  }

  hasIn(): boolean {
    return !!this._json.in;
  }

  in(): v2.SecuritySchemaLocation | undefined {
    return this._json.in;
  }

  hasScheme(): boolean {
    return !!this._json.scheme;
  }

  scheme(): string | undefined {
    return this._json.scheme;
  }

  hasBearerFormat(): boolean {
    return !!this._json.bearerFormat;
  }

  bearerFormat(): string | undefined {
    return this._json.bearerFormat;
  }

  hasFlows(): boolean {
    return !!this._json.flows;
  }

  flows(): OAuthFlowsInterface | undefined {
    if (!this._json.flows) return undefined;
    return new OAuthFlows(this._json.flows);
  }

  hasOpenIdConnectUrl(): boolean {
    return !!this._json.openIdConnectUrl;
  }

  openIdConnectUrl(): string | undefined {
    return this._json.openIdConnectUrl;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}