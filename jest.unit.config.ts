import type { Config } from '@jest/types';
import DefaultConfig from './jest.config';

const config: Config.InitialOptions = {
  ...DefaultConfig,
  testMatch: ['**/tests/**/*.spec.ts'],
};

export default config;
