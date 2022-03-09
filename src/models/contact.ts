import { BaseModel } from "./base";

export class Contact extends BaseModel {
    name(): string {
        return this.json("name");
    }

    url(): string {
        return this.json("url");
    }

    email(): string {
        return this.json("email");
    }
}