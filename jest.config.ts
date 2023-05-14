import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        // The root directory that Jest should scan for tests and modules within
        roots: ['<rootDir>/src'],

        // The file extensions to test
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

        // A map from regular expressions to paths to transformers
        transform: {
            '^.+\\.tsx?$': 'ts-jest',
        },

        // The test environment that will be used for testing
        testEnvironment: 'node',

        // A list of paths to modules that run some code to configure or set up the testing environment before each test
        setupFiles: ['dotenv/config'],

        // A list of paths to modules that run some code to configure or set up the testing framework before each test
        //setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

        // The directories to search for tests in
        testMatch: ['**/__tests__/**/*.+(ts|tsx|js|jsx)', '**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'],

        // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
        testPathIgnorePatterns: ['/node_modules/'],

        // Whether to display a summary of the test results after running tests
        verbose: true,
    };
};
