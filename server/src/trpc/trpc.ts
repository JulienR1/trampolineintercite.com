import { initTRPC, TRPCError } from "@trpc/server";
import { IPermission } from "common";
import SuperJSON from "superjson";
import { Context } from "./context";

const trpc = initTRPC.context<Context>().create({ transformer: SuperJSON });

export const isAuthenticated = trpc.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { user: ctx.user } });
});

export const isAuthorized = (permissions?: IPermission[]) =>
  trpc.middleware(({ next, ctx }) => {
    const hasPermissions = permissions && permissions.length > 0;
    if (
      hasPermissions &&
      permissions.some(
        (permission) => !ctx.user?.permissions?.includes(permission)
      )
    ) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return next({ ctx: { user: ctx.user } });
  });

export const router = trpc.router;
export const middleware = trpc.middleware;
export const mergeRouters = trpc.mergeRouters;

export const publicProcedure = trpc.procedure;
export const protectedProcedure = (permissions?: IPermission[]) =>
  trpc.procedure.use(isAuthenticated).use(isAuthorized(permissions));
