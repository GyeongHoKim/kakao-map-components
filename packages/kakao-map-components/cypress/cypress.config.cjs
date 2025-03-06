const { defineConfig } = require("cypress");
const vitePreprocessor = require("cypress-vite");
const path = require("path");
const viteConfig = require("./vite.config.cjs");

module.exports = defineConfig({
  experimentalCspAllowList: true,
  experimentalModifyObstructiveThirdPartyCode: false,
  env: {
    appkey: process.env.KAKAO_MAP_API_KEY,
  },
  e2e: {
    supportFile: path.resolve(__dirname, "support/e2e.ts"),
    specPattern: path.resolve(__dirname, "src/**/*.e2e.ts"),
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on) {
      on("file:preprocessor", vitePreprocessor());
    },
  },
  component: {
    supportFile: path.resolve(__dirname, "support/component.ts"),
    specPattern: path.resolve(__dirname, "src/**/*.component.ts"),
    devServer: {
      bundler: "vite",
      framework: "lit",
      viteConfig,
    },
    indexHtmlFile: path.resolve(__dirname, "support/component-index.html"),
  },
  experimentalWebKitSupport: true,
  includeShadowDom: true,
});
