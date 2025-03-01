import { config as litConfig } from "@repo/eslint-config/lit";

/** @type {import('eslint').Linter.Config[]} */
export default [...litConfig, { files: ["**/*.{js,mjs,cjs,ts}"] }];
