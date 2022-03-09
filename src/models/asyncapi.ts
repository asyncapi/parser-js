import { InfoInterface } from "./info";
import { BaseModel } from "./base";
import { V2AsyncAPIDocument } from "./v2";
import { V3AsyncAPIDocument } from "./v3";

export interface AsyncAPIDocumentInterface extends BaseModel {
    version(): string;
    info(): InfoInterface
}

export function newAsyncAPIDocument(json: Record<string, any>): AsyncAPIDocumentInterface {
    const version = json['asyncapi']; // Maybe this should be an arg.
    if (version == undefined || version == null || version == '') {
        throw new Error('Missing AsyncAPI version in document');
    }

    const major = version.split(".")[0];
    switch (major) {
        case '2':
            return new V2AsyncAPIDocument(json);
        case '3':
            return new V3AsyncAPIDocument(json);
        default:
            throw new Error(`Unsupported version: ${version}`);
    }
}