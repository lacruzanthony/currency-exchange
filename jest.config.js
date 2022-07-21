module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  resetMocks: true,
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["app/**/*.ts"],
  setupFilesAfterEnv: ["./app/test/setup.ts"],
};
