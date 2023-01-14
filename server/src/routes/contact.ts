import { EmailContact } from "common";
import { publicProcedure, router } from "../trpc";

export const contact = router({
  sendMail: publicProcedure.input(EmailContact).query(({ input }) => false),
});
