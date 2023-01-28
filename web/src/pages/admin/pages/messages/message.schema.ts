import z from "zod";

export const NewMessage = z
  .object({
    title: z.string().min(1, { message: "Veuillez fournir un titre" }),
    content: z.string().min(1, { message: "Veuillez entrer une annonce" }),
    startDate: z
      .string()
      .refine(dateStr => z.date().safeParse(new Date(dateStr)).success, {
        message: "Veuillez fournir une date valide",
      }),
    endDate: z
      .string()
      .refine(dateStr => z.date().safeParse(new Date(dateStr)).success, {
        message: "Veuillez fournir une date valide",
      }),
  })
  .refine(obj => new Date(obj.startDate) < new Date(obj.endDate), {
    message: "Période saisie invalide.",
  });

export type INewMessage = z.infer<typeof NewMessage>;
