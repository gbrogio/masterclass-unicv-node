import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],

  moduleNameMapper: {
    "@/sequelize/(.*)": "<rootDir>/sequelize/$1",
    "@/sequelize": "<rootDir>/sequelize/index.ts",
    "@/(.*)": "<rootDir>/src/$1",
  },

  coveragePathIgnorePatterns: ["./sequelize/*", "node_modules/*"],
};

export default config;
