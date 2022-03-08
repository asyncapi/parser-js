import type { BindingsInterface } from './bindings';
import type { ExtensionsInterface } from './extensions';
import type { ExternalDocumentationInterface } from './external-docs';
import type { TagsInterface } from './tags';
export interface BindingsMixinInterface {
    bindings(): BindingsInterface;
}
export interface DescriptionMixinInterface {
    hasDescription(): boolean;
    description(): string | undefined;
}
export interface ExtensionsMixinInterface {
    extensions(): ExtensionsInterface;
}
export interface ExternalDocumentationMixinInterface {
    hasExternalDocs(): boolean;
    externalDocs(): ExternalDocumentationInterface | undefined;
}
export interface TagsMixinInterface {
    tags(): TagsInterface;
}
