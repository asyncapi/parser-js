export function majorParserAPIVersion(version: string): number {
  if (!version) return 0;
    
  return Number(version.split('.')[0]);
}