process.env.PACKAGE_VERSION = 'test.test.test';

module.exports = {
    collectCoverage: true,
    globalSetup: '<rootDir>/jest/global-setup.js',
    globalTeardown: '<rootDir>/jest/global-teardown.js',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
