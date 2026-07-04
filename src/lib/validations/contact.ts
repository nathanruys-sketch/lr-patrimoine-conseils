import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom complet"),
  email: z.email("Adresse email invalide"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+().\s-]{6,20}$/, "Numéro de téléphone invalide")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Votre message doit contenir au moins 10 caractères"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
