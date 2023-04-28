import { createTRPCProxyClient } from "@trpc/client";
import { AppRouter } from "trampolineintercite-server";

export type Client = ReturnType<typeof createTRPCProxyClient<AppRouter>>;
