import { z } from "zod";

export const appointmentFormSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom complet"),
  email: z.email("Adresse email invalide"),
  phone: z.string().trim().regex(/^[0-9+().\s-]{6,20}$/, "Numéro de téléphone invalide"),
  date: z.date({ error: "Choisissez une date" }),
  slot: z.string().min(1, "Choisissez un créneau"),
  topic: z.string().optional(),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;
