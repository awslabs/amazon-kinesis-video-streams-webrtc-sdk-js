process.env.PACKAGE_VERSION = 'test.test.test';

module.exports = {
    collectCoverage: true,
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
