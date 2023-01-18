import { Message, MessageDetails, NewMessagePayload } from "common";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const messages = router({
  getAllVisible: publicProcedure.output(z.array(Message)).query(async () => []),

  getAll: protectedProcedure(["ADMIN_PANEL"])
    .output(z.array(MessageDetails))
    .query(async () => {
      return [];
    }),

  create: protectedProcedure(["ADMIN_PANEL", "EDIT"])
    .input(NewMessagePayload)
    .mutation(({ input }) => console.log(input)),
});
