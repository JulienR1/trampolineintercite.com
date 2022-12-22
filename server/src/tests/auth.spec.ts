import { IUser } from "../models";
import { appRouter } from "../routes";
import {
  mergeRouters,
  protectedProcedure,
  publicProcedure,
  router,
} from "../trpc";

describe("auth", () => {
  const mockRouter = mergeRouters(
    appRouter,
    router({
      public: publicProcedure.query(() => "public"),
      protected: protectedProcedure().query(() => "protected"),
      singlePermission: protectedProcedure(["ADMIN_PANEL"]).query(
        () => "single_permission"
      ),
      dualPermission: protectedProcedure(["ADMIN_PANEL", "DEPLOY"]).query(
        () => "dual_permission"
      ),
    })
  );

  const getCaller = (user: Partial<IUser> | undefined) =>
    mockRouter.createCaller({ user: user as IUser });

  describe("Authentication", () => {
    it("should allow anyone on a public route", async () => {
      const caller1 = await getCaller(undefined);
      const result1 = await caller1.public();
      expect(result1).toBe("public");

      const caller2 = await getCaller({ firstname: "test", lastname: "dummy" });
      const result2 = await caller2.public();
      expect(result2).toBe("public");
    });

    it("should forbid disconnected users on protected routes", async () => {
      const caller = await getCaller(undefined);

      await expect(() => caller.protected()).rejects.toThrow(
        expect.objectContaining({ code: "UNAUTHORIZED" })
      );
    });

    it("should allow connected users on protected routes", async () => {
      const caller = await getCaller({ firstname: "test", lastname: "dummy" });
      const result = await caller.protected();
      expect(result).toBe("protected");
    });
  });

  describe("Authorization", () => {
    it("should block an user that does not have the permission to access the route", async () => {
      const caller = await getCaller({ firstname: "test", lastname: "dummy" });

      await expect(() => caller.singlePermission()).rejects.toThrow(
        expect.objectContaining({ code: "FORBIDDEN" })
      );
    });

    it("should block an user that does not have every permission to access the route", async () => {
      const caller = await getCaller({
        firstname: "test",
        lastname: "dummy",
        permissions: ["ADMIN_PANEL"],
      });

      await expect(() => caller.dualPermission()).rejects.toThrow(
        expect.objectContaining({ code: "FORBIDDEN" })
      );
    });

    it("should allow an user that has permission to access the route", async () => {
      const caller1 = await getCaller({
        firstname: "test",
        lastname: "dummy",
        permissions: ["ADMIN_PANEL"],
      });
      const result1 = await caller1.singlePermission();
      expect(result1).toBe("single_permission");

      const caller2 = await getCaller({
        firstname: "test",
        lastname: "dummy",
        permissions: ["ADMIN_PANEL", "DEPLOY"],
      });
      const result2 = await caller2.dualPermission();
      expect(result2).toBe("dual_permission");
    });
  });
});
