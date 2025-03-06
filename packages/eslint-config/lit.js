import { config as baseConfig } from "./base.js";
import litConfigs from "eslint-plugin-lit";

/**
 * A shared ESLint configuration for Lit.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [...baseConfig, litConfigs.configs["flat/recommended"]];
