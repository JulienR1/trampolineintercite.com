import { router } from "../trpc";
import { partners } from "./partners";

export const appRouter = router({
  partners,
});

export type AppRouter = typeof appRouter;
