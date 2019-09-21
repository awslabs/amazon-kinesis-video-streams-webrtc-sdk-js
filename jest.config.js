module.exports = {
    preset: 'jest-puppeteer',
    roots: ['<rootDir>/integ'],
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
