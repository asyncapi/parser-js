import { createMapOfTypes, getMapValueOfType } from '../utils';
import { ServerVariableInterface } from 'models/server-variables';
import { BaseModel } from '../base';
import { ServerInterface } from "../server";
import { ServerVariable } from './server-variable';
import { ServerSecurityRequirementInterface } from 'models/server-security-requirement';
import { ServerSecurityRequirement } from './server-security-requirement';
import { BindingsMixin, DescriptionMixin, Mixin, SpecificationExtensionsMixin } from 'models/mixins';

export class Server extends Mixin(BaseModel, DescriptionMixin, BindingsMixin, SpecificationExtensionsMixin) implements ServerInterface {
    url(): string {
        return this.json('url');
    }

    protocol(): string {
        return this.json('protocol');
    }

    protocolVersion(): string {
        return this.json('protocolVersion');
    }

    variables(): Record<string, ServerVariableInterface> {
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
