// jest.config.js
module.exports = {
    setupFiles: ['./jest.setup.js'],
   "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageProvider": "babel",
  "coverageReporters": ["text", "lcov"],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
  };
  