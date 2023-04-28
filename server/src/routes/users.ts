import { TRPCError } from "@trpc/server";
import { User } from "common";
import { z } from "zod";
import { getUser } from "../services";
import { protectedProcedure, router } from "../trpc";

export const users = router({
  me: protectedProcedure().query(({ ctx }) => {
    return {
      id: ctx.user?.id,
      firstname: ctx.user?.firstname,
      lastname: ctx.user?.lastname,
      email: ctx.user?.email,
    };
  }),

  getByEmail: protectedProcedure(["ADMIN_PANEL"])
    .input(z.string())
    .output(User)
    .query(async ({ input }) => {
      const user = await getUser().fromEmail(input);
      if (!user.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return user.value;
    }),
});
