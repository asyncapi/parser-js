import { Mixin } from '../utils';
import { BaseModel } from '../base';
import { ServerInterface } from '../server';
import { DescriptionMixin } from './mixins/description';
import { BindingsMixin } from './mixins/bindings';

export class Server extends Mixin(BaseModel, DescriptionMixin, BindingsMixin) implements ServerInterface {
    constructor(
        private readonly _id: string,
        _json: Record<string, any>
    ){
        super(_json);
    }

    id(): string {
        return this._id;
    }

    hasProtocol(): boolean {
        return !!this.json('protocol');
    }

    protocol(): string | undefined {
        return this.json('protocol');
    }

    hasProtocolVersion(): boolean {
        return !!this.json('protocolVersion');
    }

    protocolVersion(): string {
        return this.json('protocolVersion');
    }

    hasUrl(): boolean {
        return !!this.json('url');
    }

    url(): string {
        return this.json('url');
    }
}