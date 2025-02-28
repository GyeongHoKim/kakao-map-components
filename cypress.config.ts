import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    env: {
      appkey: process.env.KAKAO_MAP_API_KEY,
    },
  },
  includeShadowDom: true,
});
