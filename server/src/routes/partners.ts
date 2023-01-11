import { TRPCError } from "@trpc/server";
import { NewPartnerPayload, Partner, PartnerDetails } from "common";
import z from "zod";
import {
  createPartner,
  getAllPartners,
  getAllPartnersWithDetails,
  removePartner,
} from "../services";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const partners = router({
  getAll: publicProcedure.output(z.array(Partner)).query(getAllPartners),

  getAllWithDetails: protectedProcedure(["ADMIN_PANEL"])
    .output(z.array(PartnerDetails))
    .query(getAllPartnersWithDetails),

  create: protectedProcedure(["ADMIN_PANEL", "EDIT"])
    .input(NewPartnerPayload)
    .mutation(async ({ input, ctx }) => {
      const partnerId = await createPartner(input, ctx.user!);
      if (!partnerId.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return partnerId.value;
    }),

  remove: protectedProcedure(["ADMIN_PANEL", "EDIT"])
    .input(z.number())
    .mutation(async ({ input }) => {
      const success = await removePartner(input);
      if (!success.isOk()) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return true;
    }),
});
