import { AsyncAPIDocumentInterface } from "models/asyncapi";
import { BaseModel } from "../base";
import { V3Info } from "./info";

export class V3AsyncAPIDocument extends BaseModel implements AsyncAPIDocumentInterface {
    version(): string {
        return this.json("asyncapi");
    }

    info(): V3Info {
        return new V3Info(this.json("info"));
    }
}
