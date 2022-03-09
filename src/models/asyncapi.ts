import { BaseModel } from "./base";
import { Info } from "./info";

export class AsyncAPIDocument extends BaseModel {
    version(): string {
        return this.json("asyncapi");
    }

    info(): Info {
        return new Info(this.json("info"));
    }
}
