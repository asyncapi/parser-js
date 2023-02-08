import { BaseModel } from '../base';

import { hasDescription, description, extensions } from './mixins';

import type { ExternalDocumentationInterface } from '../external-documentation';
import type { ExtensionsInterface } from '../extensions';

import type { v2 } from '../../spec-types';

export class ExternalDocumentation extends BaseModel<v2.ExternalDocumentationObject> implements ExternalDocumentationInterface {
  id(): string | undefined {
    return;
  }

  url(): string {
    return this._json.url;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}