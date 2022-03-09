import { BaseModel } from "./base";

export class License extends BaseModel {
    name(): string {
        return this.json("name");
    }

    url(): string {
        return this.json("url");
    }
}