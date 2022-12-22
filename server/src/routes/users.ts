import { protectedProcedure, router } from "../trpc";

export const users = router({
  me: protectedProcedure().query(({ ctx }) => {
    return {
      id: ctx.user?.id,
      firstname: ctx.user?.firstname,
      lastname: ctx.user?.lastname,
      email: ctx.user?.email,
    };
  }),
});
