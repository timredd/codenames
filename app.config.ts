import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@solidjs/start/config";
import devtools from "solid-devtools/vite";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default defineConfig({
  ssr: true,
  devOverlay: true,
  server: {
    preset: "cloudflare-pages",
    sourceMap: true,
    minify: false,

    rollupConfig: {
      external: ["__STATIC_CONTENT_MANIFEST", "node:async_hooks"],
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      sourcemap: true,
      minify: false,
      rollupOptions: {
        external: ["node:async_hooks"],
      },
    },
    plugins: [devtools({ autoname: true })],
  },
});
