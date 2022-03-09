import { InfoInterface } from "models/info";
import { BaseModel } from "../base";
import { V2Contact } from "./contact";
import { V2License } from "./license";

export class V2Info extends BaseModel implements InfoInterface {
    title(): string {
        return this.json("title");
    }

    version(): string {
        return this.json("version");
    }

    description(): string {
        return this.json("description");
    }

    termsOfService(): string {
        return this.json("termsOfService");
    }

    contact(): V2Contact | undefined {
        const doc = this.json("contact");
        return doc && new V2Contact(doc);
    }

    license(): V2License | undefined {
        const doc = this.json("license");
        return doc &&  new V2License(doc);
    }
}