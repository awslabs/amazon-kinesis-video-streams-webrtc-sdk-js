process.env.PACKAGE_VERSION = 'test.test.test';

module.exports = {
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 90,
            lines: 100,
            statements: 100,
        },
    },
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testEnvironment: "jsdom",
    clearMocks: true,
};
