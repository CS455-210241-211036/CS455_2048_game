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

    'max-lines': ['warn', 300],

    'max-statements-per-line': ['error', { max: 1 }],

    "no-magic-numbers": ["warn", { "ignore": [0, 1], "ignoreArrayIndexes": true }],

    "no-unused-vars": 'error',

    "no-unreachable": "error",
    
    "no-cond-assign": "warn",

    "no-const-assign": "error",

    "no-use-before-define": "error",

    'complexity': ['warn', { max: 10 }],
    },
  },
  pluginJs.configs.recommended,
];
