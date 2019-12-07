module.exports = {
  setupFilesAfterEnv: [
    '@testing-library/react/dont-cleanup-after-each',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'build',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  coverageThreshold: {
    global: {
      // TODO: update numbers, this is just for the challenge.
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
};
