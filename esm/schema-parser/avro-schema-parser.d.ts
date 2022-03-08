import type { Schema } from 'avsc';
import type { SchemaParser } from '../schema-parser';
import type { v2 } from '../spec-types';
declare type AvroSchema = Schema & {
    [key: string]: any;
};
export declare function AvroSchemaParser(): SchemaParser;
export declare function avroToJsonSchema(avroDefinition: AvroSchema): Promise<v2.AsyncAPISchemaDefinition>;
export {};
