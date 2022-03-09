import { InfoInterface } from "./info";

export interface AsyncAPIDocumentInterface {
    version(): string;
    info(): InfoInterface
}