import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: [
    "**/tests/integration/**/*.test.ts",
    "**/tests/unit/**/*.test.ts",
  ],
};

export default config;
