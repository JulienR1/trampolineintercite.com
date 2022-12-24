import { Partner } from "common";
import z from "zod";
import { getAllPartners } from "../services";
import { publicProcedure, router } from "../trpc";

export const partners = router({
  getAll: publicProcedure.output(z.array(Partner)).query(getAllPartners),
});
