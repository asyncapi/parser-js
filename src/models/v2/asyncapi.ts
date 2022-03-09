import { AsyncAPIDocumentInterface } from "models/asyncapi";
import { BaseModel } from "../base";
import { V2Info } from "./info";

export class V2AsyncAPIDocument extends BaseModel implements AsyncAPIDocumentInterface {
    version(): string {
        return this.json("asyncapi");
    }

    info(): V2Info {
        return new V2Info(this.json("info"));
    }
}
