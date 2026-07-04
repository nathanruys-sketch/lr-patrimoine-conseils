import { z } from "zod";

export const rendementLocatifSchema = z.object({
  montantInvesti: z.coerce.number().min(1000, "Minimum 1 000 €").max(10_000_000),
  tauxRendement: z.coerce.number().min(0.5).max(15),
  duree: z.coerce.number().int().min(1).max(40),
  reinvestirLoyers: z.boolean(),
  tmi: z.coerce.number().min(0).max(45),
});

export type RendementLocatifValues = z.infer<typeof rendementLocatifSchema>;

export const defiscalisationSchema = z.object({
  revenuNetImposable: z.coerce.number().min(0).max(5_000_000),
  parts: z.coerce.number().min(1).max(10),
  montantInvesti: z.coerce.number().min(500).max(2_000_000),
  dispositif: z.enum([
    "DEFICIT_FONCIER",
    "PER",
    "MALRAUX",
    "FCPI_FIP",
    "SCPI_FISCALE",
  ]),
});

export type DefiscalisationValues = z.infer<typeof defiscalisationSchema>;

export const retraiteSchema = z
  .object({
    ageActuel: z.coerce.number().int().min(18).max(70),
    ageDepart: z.coerce.number().int().min(50).max(75),
    versementMensuel: z.coerce.number().min(0).max(50_000),
    capitalInitial: z.coerce.number().min(0).max(10_000_000),
    rendementAnnuel: z.coerce.number().min(0).max(12),
  })
  .refine((data) => data.ageDepart > data.ageActuel, {
    message: "L'âge de départ doit être supérieur à l'âge actuel",
    path: ["ageDepart"],
  });

export type RetraiteValues = z.infer<typeof retraiteSchema>;

export const simulationLeadSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom"),
  email: z.email("Adresse email invalide"),
  phone: z.string().optional().or(z.literal("")),
});

export type SimulationLeadValues = z.infer<typeof simulationLeadSchema>;
