import { BaseModel } from "./base";
import { Contact } from "./contact";
import { License } from "./license";

export class Info extends BaseModel {
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

    contact(): Contact | undefined {
        const doc = this.json("contact");
        return doc && new Contact(doc);
    }

    license(): License | undefined {
        const doc = this.json("license");
        return doc &&  new License(doc);
    }
}