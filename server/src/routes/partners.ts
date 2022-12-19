import z from "zod";
import { Partner } from "../models";
import { getAllPartners } from "../services/partners.service";
import { publicProcedure, router } from "../trpc";

export const partners = router({
  getAll: publicProcedure.output(z.array(Partner)).query(getAllPartners),
});
