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
      "branches": 50,
      "functions": 50,
      "lines": 50,
      "statements": 50
    }
  }
};
/* eslint-enable no-undef */