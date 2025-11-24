import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tests/setup.ts", // your fetch mocks can go here
        coverage: {
            provider: "istanbul",
            reporter: ["text", "html"],
        },
    },
});
