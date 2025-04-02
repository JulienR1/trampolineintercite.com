// @ts-check
import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://trampolineintercite.com",
    integrations: [sitemap(), tailwind()],
    env: {
        schema: {
            PUBLIC_MAPS_API_KEY: envField.string({
                context: "client",
                access: "public",
            }),
        },
    },
});
