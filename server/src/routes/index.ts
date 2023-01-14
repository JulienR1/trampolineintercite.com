import { router } from "../trpc";
import { auth } from "./auth";
import { contact } from "./contact";
import { partners } from "./partners";
import { users } from "./users";

export const appRouter = router({
  partners,
  auth,
  users,
  contact,
});

export type AppRouter = typeof appRouter;
