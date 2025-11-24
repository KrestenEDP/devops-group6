export default {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@data/(.*)$": "<rootDir>/src/data/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.js"],

  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
