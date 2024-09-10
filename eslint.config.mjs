import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jasmine,
      }
    },
    rules: {

    'sonarjs/no-duplicate-string': 'error',

    'max-lines': ['error', 300],

    'max-statements-per-line': ['error', { max: 1 }],

    "no-magic-numbers": ["error", { "ignore": [0, 1], "ignoreArrayIndexes": true }],

    "no-unused-vars": 'error',

    "no-unreachable": "error",
    
    "no-cond-assign": "warn",

    "no-const-assign": "error",

    "no-unreachable" : "error",

    "no-use-before-define": "error",

    'complexity': ['warn', { max: 10 }],

    'sonarjs/no-small-switch': 'warn',
    },
  },
  pluginJs.configs.recommended,
];
