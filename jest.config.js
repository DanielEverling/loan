module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  moduleNameMapper: {
    "@base/(.*)": "<rootDir>/src/$1",
    "@shared/(.*)": "<rootDir>/src/shared/$1",
  },
  testMatch: ["<rootDir>/**/*+(spec).+(ts)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};