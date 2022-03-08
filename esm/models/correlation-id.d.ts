import type { BaseModel } from './base';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
export interface CorrelationIdInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
    hasLocation(): boolean;
    location(): string | undefined;
}
