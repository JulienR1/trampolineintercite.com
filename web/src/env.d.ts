/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_COPYRIGHT_START: string;
  readonly PUBLIC_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
