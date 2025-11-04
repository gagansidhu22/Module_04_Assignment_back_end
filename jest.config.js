/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"], // ✅ match folder name here
  moduleFileExtensions: ["ts", "js", "json"],
  verbose: true
};
