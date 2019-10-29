module.exports = {
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    transform: {
        "^.+\\.(js?|jsx?)$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "((\\.|/)(test|spec))\\.(jsx?|ts?|tsx?|js?)$",
    globals: {
        "ts-jest": {
            useBabelrc: true,
            tsConfigFile: "tsconfig.jest.json",
        }
    },
    modulePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/example"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
    ],
    setupFiles: ["<rootDir>/src/__tests__/setupTests.js"]
};
