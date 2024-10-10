/* eslint-disable no-undef */
// jest.config.js
module.exports = {
    setupFiles: ['./jest.setup.js'],
   "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageProvider": "babel",
  "coverageReporters": ["text", "lcov"],
  "coverageThreshold": {
    "global": {
      "functions": 75,
      "lines": 75,
      "statements": 75
    }
  }
};
/* eslint-enable no-undef */