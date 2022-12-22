import { router } from "../trpc";
import { auth } from "./auth";
import { partners } from "./partners";
import { users } from "./users";

export const appRouter = router({
  partners,
  auth,
  users,
});

export type AppRouter = typeof appRouter;
