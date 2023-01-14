import { z } from "zod";

export const EmailContact = z.object({
  name: z.string().min(1, "Veuillez nous indiquer votre nom."),
  email: z
    .string()
    .min(1, "Veuillez fournir votre adresse courriel.")
    .email("Courriel invalide."),
  subject: z.string(),
  message: z.string().min(1, "Veuillez inscrire un message."),
});

export type IEmailContact = z.infer<typeof EmailContact>;
