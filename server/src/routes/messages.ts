import { TRPCError } from "@trpc/server";
import { Message, MessageDetails, NewMessagePayload } from "common";
import { z } from "zod";
import {
  createMessage,
  getDetailedMessages,
  getMessages,
  removeMessage,
} from "../services";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const messages = router({
  getAllVisible: publicProcedure.output(z.array(Message)).query(getMessages),

  getAll: protectedProcedure(["ADMIN_PANEL"])
    .output(z.array(MessageDetails))
    .query(getDetailedMessages),

  create: protectedProcedure(["ADMIN_PANEL", "EDIT"])
    .input(NewMessagePayload)
    .mutation(async ({ input, ctx }) => {
      const messageId = await createMessage(input, ctx.user!);
      if (!messageId.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return messageId.value;
    }),

  remove: protectedProcedure(["ADMIN_PANEL", "EDIT"])
    .input(z.number())
    .mutation(async ({ input }) => {
      const success = await removeMessage(input);
      if (!success.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return true;
    }),
});
