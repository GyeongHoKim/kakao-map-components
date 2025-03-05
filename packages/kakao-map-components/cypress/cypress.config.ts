import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
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
      viteConfig: path.resolve(__dirname, "vite.config.ts"),
    } as any,
    indexHtmlFile: path.resolve(__dirname, "support/component-index.html"),
  },
  experimentalWebKitSupport: true,
  includeShadowDom: true,
});
