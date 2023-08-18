import { Parser as ParserV2 } from 'parserv2';
import { Parser as ParserV3, convertToOldAPI as convertToOldAPIV3 } from 'parserv3';

import type { ParseOutput as ParseOutputV2 } from 'parserv2';
import type { AsyncAPIDocumentInterface as AsyncAPIDocumentInterfaceV3, ParseOutput as ParseOutputV3Original } from 'parserv3';
import type { AsyncAPIDocument as AsyncAPIDocumentV3 } from 'parserv3/esm/old-api/asyncapi';

export type ParseOutputV3 = ParseOutputV3Original & { document: AsyncAPIDocumentInterfaceV3 | AsyncAPIDocumentV3 | undefined }
export type ParseOutputPerVersion = ParseOutputV2 | ParseOutputV3 | undefined;
export type ParseOptions = {
    ParserAPIMajorVersion: number;
}

// Cache for parsers
const parsers = new Map<number, ParserV2 | ParserV3>();
export async function Parse(doc: any, options?: ParseOptions): Promise<ParseOutputPerVersion> {
  if (!options || !options.ParserAPIMajorVersion) {
    // Using Parser v3 (latest atm) by default 
    if (!parsers.has(3)) parsers.set(3, new ParserV3());
    const parsedDoc = await (parsers.get(3) as ParserV3).parse(doc) as ParseOutputV3;        
    if (parsedDoc?.document) parsedDoc.document = convertToOldAPIV3(parsedDoc.document) as any;

    return parsedDoc;
  }

  switch (options.ParserAPIMajorVersion) {
  case 1:
    if (!parsers.has(2)) parsers.set(2, new ParserV2());
    return await parsers.get(2)?.parse(doc);
  case 2:
    if (!parsers.has(3)) parsers.set(3, new ParserV3());
    return await parsers.get(3)?.parse(doc);     
  }   
}

