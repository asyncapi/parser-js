import { BaseModel } from '../base';
import { SecurityScheme } from './security-scheme';

import { bindings, hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';

import type { BindingsInterface } from '../bindings';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-documentation';
import type { OperationAction } from '../operation';
import type { OperationTraitInterface } from '../operation-trait';
import type { TagsInterface } from '../tags';

import type { v2 } from '../../spec-types';
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';

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

  isSend(): boolean {
    return this.action() === 'subscribe';
  }

  isReceive(): boolean {
    return this.action() === 'publish';
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this);
  }

  security(): SecurityRequirements[] {
    const securitySchemes = (this._meta?.asyncapi?.parsed?.components?.securitySchemes || {}) as Record<string, v2.SecuritySchemeObject>;
    return (this._json.security || []).map((requirement, index) => {
      const requirements: SecurityRequirement[] = [];
      Object.entries(requirement).forEach(([security, scopes]) => {
        const scheme = this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` });
        requirements.push(
          this.createModel(SecurityRequirement, { scheme, scopes }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}` })
        );
      });
      return new SecurityRequirements(requirements);
    });
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
