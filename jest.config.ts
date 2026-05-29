import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/types/**',
    '!src/test-utils/**',
    '!src/__tests__/**',
    // Next.js route boundary files - tested via integration, not unit
    '!src/app/**/layout.tsx',
    '!src/app/**/loading.tsx',
    '!src/app/**/error.tsx',
    '!src/app/**/not-found.tsx',
    '!src/app/**/page.tsx',
    '!src/app/api/**/route.ts',
    '!src/proxy.ts',
    // Server-only modules cannot run in jsdom
    '!src/lib/server/**',
    // Page-level client view containers are exercised by the
    // integration tests in src/__tests__
    '!src/app/(dashboard)/users/UsersView.tsx',
  ],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 80,
      functions: 80,
      lines: 85,
    },
  },
};

export default createJestConfig(config);
