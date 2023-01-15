import { defineConfig } from "astro/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@styles/": `${path.resolve(__dirname, "src/styles")}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@styles/globals.scss";`,
        },
      },
    },
  },
  output: "static",
  adapter: vercel(),
});
