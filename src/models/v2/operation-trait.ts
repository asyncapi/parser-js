import { BaseModel } from "../base";
import { SecurityScheme } from './security-scheme';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';
import { ExternalDocumentationMixin } from './mixins/external-docs';
import { TagsMixin } from './mixins/tags';

import type { ModelMetadata } from "../base";
import type { OperationAction } from "../operation";
import type { OperationTraitInterface } from "../operation-trait";
import type { SecuritySchemeInterface } from "../security-scheme";

export class OperationTrait extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, ExtensionsMixin, ExternalDocumentationMixin, TagsMixin) implements OperationTraitInterface {
  constructor(
    private readonly _id: string,
    _json: Record<string,any>,
    public readonly _meta: ModelMetadata & { action: OperationAction } = {} as any,
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this.operationId() || this._id;
  }

  action(): OperationAction {
    return this._meta.action;
  }

  hasOperationId(): boolean {
    return !!this._json.operationId;
  }

  operationId(): string | undefined {
    return this._json.operationId;
  }

  hasSummary(): boolean {
    return !!this._json.summary;
  }

  summary(): string | undefined {
    return this._json.summary;
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
