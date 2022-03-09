import { LicenseInterface } from "models/license";
import { BaseModel } from "../base";

export class V3License extends BaseModel implements LicenseInterface {
    name(): string {
        return this.json("name");
    }

    url(): string {
        return this.json("url");
    }
}