/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_COPYRIGHT_START: string;
  readonly PUBLIC_MAPS_API_KEY: string;
  readonly PUBLIC_SERVER_URL: string;
  readonly PUBLIC_BACKEND_IDLE_TIME_IN_MINS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
