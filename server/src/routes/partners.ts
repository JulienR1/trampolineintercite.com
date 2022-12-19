import { publicProcedure, router } from "../trpc";

export const partners = router({
  getAll: publicProcedure.query(() => "partners!"),
});
