import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
  coverageReporters: [
    'text'
  ],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>'], 
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 10000,
  collectCoverageFrom: [
    'src/**'
  ],
  moduleNameMapper: {
    '^@asyncapi/parser$': path.resolve(__dirname, '../parser')
  }
};

export default config;
