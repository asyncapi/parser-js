import { Parser as ParserV2 } from 'parserv2';
import { Parser as ParserV3 } from 'parserv3';

import type { ParseOptions as ParserOptionsParserV2 } from 'parserv2';
import type { ParseOptions as ParserOptionsParserV3 } from 'parserv3';

import { majorParserAPIVersion } from './utils';

type Parser = ParserV2 | ParserV3;

// Cache for parsers
const parsers = new Map<number, Parser>();

export function NewParser(parserAPIVersion: string, options?: ParserOptionsParserV2 | ParserOptionsParserV3): Parser {
  const parserAPIMajorVersion = majorParserAPIVersion(parserAPIVersion);
    
  switch (parserAPIMajorVersion) {
  case 1:
    if (options) {
      return new ParserV2(options); // Can't use cached because options is not empty
    } 

    if (!parsers.has(2)) parsers.set(2, new ParserV2());
    return parsers.get(2) as ParserV2;
  default:
  case 0: // Using Parser v3 (latest atm) by default 
  case 2:
    if (options) {
      return new ParserV3(options); // Can't use cached because options is not empty
    } 

    if (!parsers.has(3)) parsers.set(3, new ParserV3());
    return parsers.get(3) as ParserV3; 
  }   
}

