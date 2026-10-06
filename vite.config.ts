import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  fmt: {
    printWidth: 120,
    trailingComma: "es5",
    ignorePatterns: ["src/routeTree.gen.ts", "projects.json"],
  },
  lint: {
    plugins: ["typescript", "unicorn", "oxc", "react", "jsx-a11y"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
      "react/rules-of-hooks": "error",
      "react/exhaustive-deps": "warn",
      "react/button-has-type": "warn",
      "jsx-a11y/alt-text": "warn",
    },
    ignorePatterns: ["src/routeTree.gen.ts"],
    options: { typeAware: true, typeCheck: true },
  },
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: lazyPlugins(() => [
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
    }),
    react(),
  ]),
});
