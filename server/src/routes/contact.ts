import { TRPCError } from "@trpc/server";
import { EmailContact } from "common";
import { forwardEmailToReference } from "../services/mailer.service";
import { publicProcedure, router } from "../trpc";

export const contact = router({
  sendMail: publicProcedure.input(EmailContact).query(async ({ input }) => {
    const result = await forwardEmailToReference(input);
    if (!result.isOk()) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }
    return true;
  }),
});
