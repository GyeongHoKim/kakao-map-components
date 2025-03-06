const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "../src/index.ts"),
      name: "KakaoMapComponents",
      fileName: "index",
      formats: ["es", "iife"],
    },
    outDir: "../dist",
  },
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  optimizeDeps: {
    include: ["lit"],
  },
});
