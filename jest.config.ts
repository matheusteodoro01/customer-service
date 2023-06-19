import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: '.',
  clearMocks: true,
  collectCoverage: false,
  silent: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/domain/models/index.ts',
    '!<rootDir>/src/domain/repositories/index.ts',
    '!<rootDir>/src/infra/dto/**',
    '!<rootDir>/src/infra/common/**',
    '!<rootDir>/src/main/bootstrap.ts',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
