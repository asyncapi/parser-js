import { LicenseInterface } from "models/license";
import { V3BaseModel } from "./base";

export class V3License extends V3BaseModel implements LicenseInterface {
    name(): string {
        return this.json("name");
    }

    url(): string {
        return this.json("url");
    }
}