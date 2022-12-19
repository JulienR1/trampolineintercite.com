import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = ({ req }: FetchCreateContextFnOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const middleware = trpc.middleware;
export const publicProcedure = trpc.procedure;
