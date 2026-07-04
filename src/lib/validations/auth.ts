import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Adresse email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
});

export type LoginValues = z.infer<typeof loginSchema>;
