import { TRPCError } from "@trpc/server";
import z from "zod";
import { AuthCredentials, NewUser } from "../models";
import { authenticateUser, registerUser } from "../services";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const auth = router({
  login: publicProcedure
    .input(AuthCredentials)
    .output(z.string())
    .query(({ input }) => authenticateUser().fromCredentials(input)),

  validate: protectedProcedure().query(() => true),

  signUp: publicProcedure
    .input(NewUser)
    .output(z.number())
    .mutation(async ({ input }) => {
      const generatedId = await registerUser(input);
      if (!generatedId.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return generatedId.value.id;
    }),
});
