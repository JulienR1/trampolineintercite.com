import { TRPCError } from "@trpc/server";
import { AuthCredentials, NewUser } from "common";
import z from "zod";
import { authenticateUser, registerUser } from "../services";
import { getByName } from "../services/people.service";
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

  signupExistingPerson: publicProcedure
    .input(NewUser)
    .output(z.number())
    .mutation(async ({ input }) => {
      const people = await getByName(input);
      if (!people.isOk() || people.value.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const userId = await registerUser({ id: people.value[0].id, ...input });
      if (!userId.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      return userId.value.id;
    }),
});
