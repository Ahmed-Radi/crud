module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootdir>/src"],
    modulePaths: ["<rootdir>/src"]
    // the following line is needed in order to grab modules from the
    // src folder without the need to write them relatively
  };