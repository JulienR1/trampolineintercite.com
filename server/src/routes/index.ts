import { publicProcedure, router } from "../trpc";
import { auth } from "./auth";
import { contact } from "./contact";
import { deploy } from "./deploy";
import { messages } from "./messages";
import { partners } from "./partners";
import { users } from "./users";

export const appRouter = router({
  ping: publicProcedure.query(() => true),
  partners,
  auth,
  users,
  contact,
  messages,
  deploy,
});

export type AppRouter = typeof appRouter;
