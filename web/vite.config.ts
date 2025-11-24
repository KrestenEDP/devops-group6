import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@customTypes": path.resolve(__dirname, "src/types"),
      "@components": path.resolve(__dirname, "src/components"),
      "@features": path.resolve(__dirname, "src/features"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@context": path.resolve(__dirname, "src/context"),
      "@data": path.resolve(__dirname, "src/data")
    }
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      reporter: ["text", "html"]
    }
  }
});
