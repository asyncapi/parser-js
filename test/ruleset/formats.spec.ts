import { schemas } from '@asyncapi/specs';
import { AsyncAPIFormats, Formats } from '../../src/ruleset/formats';
import { getSemver } from '../../src/utils';

import type { Format } from '@stoplight/spectral-core';

describe('AsyncAPI format', () => {
  describe('Recognizes versions', () => {
    const testCases = [
      { formatVersion: '2.0.0', document: {asyncapi: '2.0.0'}, existsFormat: true, result: true },
      { formatVersion: '2.0.0', document: {asyncapi: '2.1.8'}, existsFormat: true, result: false },
      { formatVersion: '2.1.8', document: {asyncapi: '2.0.0'}, existsFormat: true, result: false },
      { formatVersion: '2.1.3', document: {asyncapi: '2.1.3'}, existsFormat: true, result: true },
      { formatVersion: '2.1.3', document: {asyncapi: '2.0.0'}, existsFormat: true, result: false },
      { formatVersion: '2.0.0', document: {asyncapi: '2.1.3'}, existsFormat: true, result: false },
      { formatVersion: '2.2.9', document: {asyncapi: '2.2.9'}, existsFormat: true, result: true },
      { formatVersion: '2.2.9', document: {asyncapi: '2.0.0'}, existsFormat: true, result: false },
      { formatVersion: '2.0.0', document: {asyncapi: '2.2.9'}, existsFormat: true, result: false },
      { formatVersion: '2.6.5', document: {asyncapi: '2.6.5'}, existsFormat: true, result: true },
      { formatVersion: '2.6.5', document: {asyncapi: '2.0.0'}, existsFormat: true, result: false },
      { formatVersion: '2.0.0', document: {asyncapi: '2.6.5'}, existsFormat: true, result: false },
      { formatVersion: '3.0.10', document: {asyncapi: '3.0.10'}, existsFormat: true, result: true },
      { formatVersion: '3.0.0', document: {openapi: '3.0.0'}, existsFormat: true, result: false },
      { formatVersion: '3.0.0', document: null, existsFormat: true, result: false },
      { formatVersion: '999.999.0', document: {}, existsFormat: false, result: false },
      { formatVersion: '19923.1.0', document: {}, existsFormat: false, result: false },
      { formatVersion: '2.99.0', document: {}, existsFormat: false, result: false },
    ];
      
    it.each(testCases)('format formatVersion recognizes version %p correctly', testCase => {
      const format = AsyncAPIFormats.find(testCase.formatVersion);
      expect(format !== undefined).toEqual(testCase.existsFormat);
      if (format !== undefined) {
        expect(format(testCase.document, null)).toEqual(testCase.result);
      }
    });
  });
});

describe('AsyncAPIFormats collection', () => {
  it('Is a Formats collection', () => {
    expect(AsyncAPIFormats).toBeInstanceOf(Formats);
  });

  it('Returns all formats as array', () => {
    const formats = AsyncAPIFormats.formats();
    expect(formats).toHaveLength(Object.keys(schemas).length);    
  });

  it('Finds existing version', () => {
    expect(AsyncAPIFormats.find('2.0.0') !== undefined).toBeTruthy();
  });

  it('Finds non-existing version', () => {
    expect(AsyncAPIFormats.find('9999.9999.99999-rc') === undefined).toBeTruthy();
  });

  it('Filters by major version', () => {
    const formats = AsyncAPIFormats;
    formats.set('999.0.0', (_: unknown): boolean => true);

    const filteredMajorVersion = '2';
    const previousLenght = AsyncAPIFormats.formats().length;
    const filteredFormats = AsyncAPIFormats.filterByMajorVersions([filteredMajorVersion]);

    expect(filteredFormats.size).toBeLessThan(previousLenght);
    filteredFormats.forEach((_, version) => {
      expect(String(getSemver(version).major)).toEqual(filteredMajorVersion);
    });
  });

  it('Excludes by version', () => {
    const excludedVersions = ['2.0.0', '2.1.0', '2.6.0'];
    const previousLenght = AsyncAPIFormats.formats().length;
    const filteredFormats = AsyncAPIFormats.excludeByVersions(excludedVersions);

    expect(filteredFormats.size).toEqual(previousLenght - excludedVersions.length);
    excludedVersions.forEach((version) => {
      expect(filteredFormats.find(version)).toBeFalsy();
    });
  });

  it('Excludes by major version', () => {
    const excludedMajorVersions = ['3'];
    const previousLenght = AsyncAPIFormats.formats().length;
    const filteredFormats = AsyncAPIFormats.excludeByMajorVersions(excludedMajorVersions);

    expect(filteredFormats.size).toEqual(previousLenght - excludedMajorVersions.length);
    filteredFormats.forEach((_, version) => {
      expect(excludedMajorVersions).not.toContain(String(getSemver(version).major));
    });
  });
});
