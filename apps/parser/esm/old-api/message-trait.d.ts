import { SpecificationExtensionsModel } from './mixins';
import { CorrelationId } from './correlation-id';
import { Schema } from './schema';
import type { v2 } from '../spec-types';
export declare class MessageTrait<T = v2.MessageTraitObject> extends SpecificationExtensionsModel<T & v2.MessageTraitObject> {
    id(): string | undefined;
    headers(): Schema | null;
    header(name: string): Schema | null;
    correlationId(): CorrelationId | null;
    schemaFormat(): string;
    contentType(): string | undefined;
    name(): string | undefined;
    title(): string | undefined;
    summary(): string | undefined;
    description(): string | null;
    hasDescription(): boolean;
    externalDocs(): import("./external-docs").ExternalDocs | null;
    hasExternalDocs(): boolean;
    hasTags(): boolean;
    tags(): import("./tag").Tag[];
    tagNames(): string[];
    hasTag(name: string): boolean;
    tag(name: string): import("./tag").Tag | null;
    hasBindings(): boolean;
    bindings(): Record<string, v2.Binding>;
    bindingProtocols(): string[];
    hasBinding(name: string): boolean;
    binding(name: string): v2.Binding | null;
    examples(): v2.MessageExampleObject[] | undefined;
}
