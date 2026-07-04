import { z } from "zod";

export const serviceSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres, tirets)"),
  category: z.enum(["FISCALITE", "IMMOBILIER", "EPARGNE", "RETRAITE"]),
  title: z.string().trim().min(3, "Titre trop court"),
  shortDescription: z.string().trim().min(10).max(200),
  description: z.string().trim().min(20),
  icon: z.string().trim().min(1, "Choisissez une icône"),
  highlights: z.array(z.string().trim().min(1)).default([]),
  order: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;

export const testimonialSchema = z.object({
  authorName: z.string().trim().min(2, "Nom requis"),
  authorLocation: z.string().trim().optional().or(z.literal("")),
  authorAge: z.coerce.number().int().min(18).max(120).optional(),
  content: z.string().trim().min(10, "Témoignage trop court"),
  rating: z.coerce.number().int().min(1).max(5),
  source: z.string().trim().optional().or(z.literal("")),
  published: z.boolean().default(true),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export const articleSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres, tirets)"),
  title: z.string().trim().min(3, "Titre trop court"),
  excerpt: z.string().trim().min(10).max(300),
  content: z.string().trim().min(50, "Contenu trop court"),
  coverImage: z.string().trim().optional().or(z.literal("")),
  category: z.string().trim().optional().or(z.literal("")),
  tags: z.array(z.string().trim().min(1)).default([]),
  published: z.boolean().default(true),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;

export const leadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "ARCHIVED"]),
});

export const appointmentStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
});
