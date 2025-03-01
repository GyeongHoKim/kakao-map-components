import globals from "globals";
import tseslint from "typescript-eslint";
import { configs } from "eslint-plugin-lit";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  configs["flat/recommended"],
  eslintConfigPrettier,
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
];
