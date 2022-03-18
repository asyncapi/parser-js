import { createMapOfTypes, getMapValueOfType } from '../utils';
import { ServerVariableInterface } from '../server-variables';
import { BaseModel } from '../base';
import { ServerInterface } from "../server";
import { ServerVariable } from './server-variable';
import { ServerSecurityRequirementInterface } from '../server-security-requirement';
import { ServerSecurityRequirement } from './server-security-requirement';
import { BindingsMixin, DescriptionMixin, Mixin, SpecificationExtensionsMixin } from '../mixins';

export class Server extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, SpecificationExtensionsMixin) implements ServerInterface {
    url(): string {
        return this.json('url');
    }

    hasUrl(): boolean {
        return !!this.json('url');
    }

    protocol(): string {
        return this.json('protocol');
    }

    hasProtocol(): boolean {
        return !!this.json('protocol');
    }

    protocolVersion(): string {
        return this.json('protocolVersion');
    }

    hasProtocolVersion(): boolean {
        return !!this.json('protocolVersion');
    }

    variables(): Record<string, ServerVariableInterface>;
    variables(): Record<string, ServerVariableInterface> | undefined {
        if(!this.json('variables')) return undefined;
        return createMapOfTypes(this.json('variables'), ServerVariable)
    }

    variable(name: string): ServerVariableInterface {
        return getMapValueOfType(this.json('variables'), name, ServerVariable);
    }

    hasVariables(): boolean {
        return !!this.json('variables');
    }

    security(): [ServerSecurityRequirementInterface] {
        return this.json('security').map((sec: any) => new ServerSecurityRequirement(sec))
    }

}
