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
    
    },
  },
  pluginJs.configs.recommended,
];
