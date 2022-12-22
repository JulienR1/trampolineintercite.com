import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "trampolineintercite-server";
import { getJwtToken } from "./utils";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.PUBLIC_SERVER_URL}/trpc`,
      headers: () => {
        const token = getJwtToken();
        return token ? { authorization: "Bearer " + token } : {};
      },
    }),
  ],
});
