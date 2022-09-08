import { DiagnosticSeverity } from '@stoplight/types';
import { cloneDeep } from 'lodash';

import { 
  hasErrorDiagnostic,
  hasWarningDiagnostic,
  createDetailedAsyncAPI,
  getSemver,
  mergePatch,
  normalizeInput,
} from '../src/utils';

import type { Diagnostic } from '../src/types';

describe('utils', function() {
  describe('hasErrorDiagnostic()', function() {
    const simpleDiagnostic: Diagnostic = {
      code: 'test-code',
      message: 'test-message',
      range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
      severity: DiagnosticSeverity.Error,
      path: [],
    };

    it('should return true when diagnostics have at least one error', function() {
      const diagnostics: Diagnostic[] = [
        {
          ...simpleDiagnostic,
          severity: DiagnosticSeverity.Error,
        },
        {
          ...simpleDiagnostic,
          severity: DiagnosticSeverity.Warning,
        }
      ];

      expect(hasErrorDiagnostic(diagnostics)).toEqual(true);
    });

    it('should return false when diagnostics have no error', function() {
      const diagnostics: Diagnostic[] = [
        {
          ...simpleDiagnostic,
          severity: DiagnosticSeverity.Warning,
        },
        {
          ...simpleDiagnostic,
          severity: DiagnosticSeverity.Warning,
        }
      ];

      expect(hasErrorDiagnostic(diagnostics)).toEqual(false);
    });
  });

  describe('hasErrorDiagnostic()', function() {
    const simpleDiagnostic: Diagnostic = {
      code: 'test-code',
      message: 'test-message',
      range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
      severity: DiagnosticSeverity.Error,
      path: [],
    };

    it('should return true when diagnostics have at least one warning', function() {
      const diagnostics: Diagnostic[] = [
        {
          ...simpleDiagnostic,
          severity: DiagnosticSeverity.Error,
        },
        {
          ...simpleDiagnostic,
          severity: DiagnosticSeverity.Warning,
        }
      ];

      expect(hasWarningDiagnostic(diagnostics)).toEqual(true);
    });

    it('should return false when diagnostics have no warning', function() {
      const diagnostics: Diagnostic[] = [
        {
          ...simpleDiagnostic,
          severity: DiagnosticSeverity.Error,
        },
        {
          ...simpleDiagnostic,
          severity: DiagnosticSeverity.Error,
        }
      ];

      expect(hasWarningDiagnostic(diagnostics)).toEqual(false);
    });
  });

  describe('createDetailedAsyncAPI()', function() {
    it('should create detailed object', function () {
      const source = '{ asyncapi: \'2.1.37\' }';
      const parsed = { asyncapi: '2.1.37' };
      const detailed = createDetailedAsyncAPI(source, parsed as any);
      expect(detailed.source).toEqual(source);
      expect(detailed.parsed).toEqual(parsed);
      expect(detailed.semver.version).toEqual('2.1.37');
      expect(detailed.semver.major).toEqual(2);
      expect(detailed.semver.minor).toEqual(1);
      expect(detailed.semver.patch).toEqual(37);
      expect(detailed.semver.rc).toEqual(undefined);
    });
  });

  describe('getSemver()', function() {
    it('should split version', function () {
      const semver = getSemver('2.1.37');
      expect(semver.version).toEqual('2.1.37');
      expect(semver.major).toEqual(2);
      expect(semver.minor).toEqual(1);
      expect(semver.patch).toEqual(37);
      expect(semver.rc).toEqual(undefined);
    });

    it('should split version with release candidate', function () {
      const semver = getSemver('2.1.37-rc69');
      expect(semver.version).toEqual('2.1.37-rc69');
      expect(semver.major).toEqual(2);
      expect(semver.minor).toEqual(1);
      expect(semver.patch).toEqual(37);
      expect(semver.rc).toEqual(69);
    });
  });

  describe('normalizeInput()', function() {
    it('should stringify input', function () {
      const source = { asyncapi: '2.1.37' };
      const normalized = JSON.stringify(source, undefined, 2);
      expect(normalizeInput(source)).toEqual(normalized);
    });
  });

  describe('mergePatch()', function() {
    it('should replace an attribute', function () {
      expect(mergePatch({ a: 'b' }, { a: 'c' })).toEqual({ a: 'c' });
    });
    
    it('should add an attribute', function () {
      expect(mergePatch({ a: 'b' }, { b: 'c' })).toEqual({
        a: 'b',
        b: 'c',
      });
    });

    it('should delete attribute', function () {
      expect(mergePatch({ a: 'b' }, { a: null })).toEqual({});
    });
    
    it('should delete attribute without affecting others', function () {
      expect(mergePatch({ a: 'b', b: 'c' }, { a: null })).toEqual({
        b: 'c',
      });
    });
    
    it('should replace array with a string', function () {
      expect(mergePatch({ a: ['b'] }, { a: 'c' })).toEqual({ a: 'c' });
    });
    
    it('should replace an string with an array', function () {
      expect(mergePatch({ a: 'c' }, { a: ['b'] })).toEqual({ a: ['b'] });
    });
    
    it('should apply recursively', function () {
      expect(mergePatch({ a: { b: 'c' } }, { a: { b: 'd', c: null } })).toEqual({
        a: { b: 'd' },
      });
    });
    
    it('should replace an object array with a number array', function () {
      expect(mergePatch({ a: [{ b: 'c' }] }, { a: [1] })).toEqual({
        a: [1],
      });
    });
    
    it('should replace an array', function () {
      expect(mergePatch(['a', 'b'], ['c', 'd'])).toEqual(['c', 'd']);
    });
    
    it('should replace an object with an array', function () {
      expect(mergePatch({ a: 'b' }, ['c'])).toEqual(['c']);
    });
    
    it('should replace an object with null', function () {
      expect(mergePatch({ a: 'foo' }, null)).toEqual(null);
    });
    
    it('should replace an object with a string', function () {
      expect(mergePatch({ a: 'foo' }, 'bar')).toEqual('bar');
    });
    
    it('should not change null attributes', function () {
      expect(mergePatch({ e: null }, { a: 1 })).toEqual({ e: null, a: 1 });
    });
    
    it('should not set an attribute to null', function () {
      expect(mergePatch([1, 2], { a: 'b', c: null })).toEqual({ a: 'b' });
    });
    
    it('should not set an attribute to null in a sub object', function () {
      expect(mergePatch({}, { a: { bb: { ccc: null } } })).toEqual({
        a: { bb: {} },
      });
    });

    it('should not directly edit the origin', function () {
      const origin = { a: { b: 10 }, c: 5 };
      const clone = cloneDeep(origin);
      const patched = mergePatch(origin, { a: { b: 8 } }) as Record<string, unknown>;
      expect(patched).not.toEqual(origin);
      expect(patched.a).not.toEqual(origin.a);
      expect(origin).toEqual(clone);
    });
    
    it('should recycle properties if possible', function () {
      const origin = { a: { b: 10 }, c: 5 };
      const patched = mergePatch(origin, { c: 8 }) as Record<string, unknown>;
      expect(patched.a).toEqual(origin.a);
    });
  });
});
