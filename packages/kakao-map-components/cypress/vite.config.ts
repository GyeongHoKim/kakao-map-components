// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "../src/index.ts"),
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
      "@": resolve(__dirname, "../src"),
    },
  },
  plugins: [
    dts({
      exclude: ["./cypress"],
    }),
  ],
});
