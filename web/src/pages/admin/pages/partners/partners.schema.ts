import { z } from "zod";

export const NewPartner = z
  .object({
    label: z.string().min(1, { message: "Veuillez entrer un nom" }),
    description: z.string().optional(),
    websiteUrl: z.string().url({ message: "Url invalide" }),
    from: z
      .string()
      .transform(dateStr => new Date(dateStr))
      .refine(date => z.date().safeParse(date).success, {
        message: "Veuillez entrer une date",
      }),
    to: z
      .string()
      .nullable()
      .transform(dateStr => (dateStr ? new Date(dateStr) : undefined))
      .refine(date => z.date().optional().safeParse(date).success, {
        message: "Veuillez entrer une date",
      }),
    logo: z
      .instanceof(File, { message: "Fournir un logo" })
      .refine(file => z.string().min(1).safeParse(file.name).success, {
        message: "Fournir un logo",
      }),
  })
  .refine(obj => (obj.to ? obj.to > obj.from : true), {
    message: "La période saisie est invalide",
  });

export type INewPartner = z.infer<typeof NewPartner>;
