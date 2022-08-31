import { BaseModel } from "../base";
import { SecurityScheme } from './security-scheme';

import { bindings, hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';

import type { BindingsInterface } from "../bindings";
import type { ExtensionsInterface } from "../extensions";
import type { ExternalDocumentationInterface } from "../external-docs";
import type { OperationAction } from "../operation";
import type { OperationTraitInterface } from "../operation-trait";
import type { SecuritySchemeInterface } from "../security-scheme";
import type { TagsInterface } from "../tags";

import type { v2 } from "../../spec-types";

export class OperationTrait<J extends v2.OperationTraitObject = v2.OperationTraitObject> extends BaseModel<J, { id: string, action: OperationAction }> implements OperationTraitInterface {
  id(): string {
    return this.operationId() || this._meta.id;
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

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this);
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this);
  }

  security(): Array<Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }>> {
    const securitySchemes = this._meta.asyncapi?.parsed?.components?.securitySchemes || {};
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

  tags(): TagsInterface {
    return tags(this);
  }

  bindings(): BindingsInterface {
    return bindings(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
