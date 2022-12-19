import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "trampolineintercite-server";

export const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: `${import.meta.env.SERVER_URL}/trpc` })],
});
