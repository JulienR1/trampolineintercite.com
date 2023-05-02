import { TRPCError } from "@trpc/server";
import { Deployment } from "common";
import { z } from "zod";
import {
  deployWebsite,
  getCurrentDeployment,
  getPreviousDeployments,
} from "../services/deployment.service";
import { protectedProcedure, router } from "../trpc";

export const deploy = router({
  getCurrentDeployment: protectedProcedure(["ADMIN_PANEL"])
    .output(Deployment.or(z.null()))
    .query(getCurrentDeployment),

  getPreviousDeployments: protectedProcedure(["ADMIN_PANEL"])
    .output(z.array(Deployment))
    .query(async () => {
      const previousDeployments = await getPreviousDeployments();
      if (!previousDeployments.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return previousDeployments.value;
    }),

  startNewDeployment: protectedProcedure(["ADMIN_PANEL", "DEPLOY"])
    .output(z.number())
    .mutation(async ({ ctx }) => {
      const runId = await deployWebsite(ctx.user!);
      if (!runId.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return runId.value;
    }),
});
