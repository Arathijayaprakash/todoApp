import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  coverageReporters: [
    "html",
    "lcov",
    "text-summary",
    "cobertura",
    "json-summary",
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      lines: 70,
      statements: 70,
      functions: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
