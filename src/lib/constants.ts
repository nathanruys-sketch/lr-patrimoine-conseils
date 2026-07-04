export const SITE = {
  name: "LR Patrimoine Conseils",
  shortName: "LR Patrimoine",
  tagline: "Votre patrimoine, piloté avec clarté",
  description:
    "Cabinet de conseil en gestion de patrimoine indépendant : optimisation fiscale, immobilier, épargne et préparation de la retraite.",
  url: "https://www.lr-patrimoine-conseils.fr",
  locale: "fr_FR",
} as const;

export const CONTACT = {
  email: "ruys.ludovic@gmail.com",
  phone: "06 07 27 54 79",
  phoneHref: "tel:+33607275479",
  address: "Lyon, France",
  linkedin: "https://www.linkedin.com/in/ludovic-ruys-conseiller-patrimonial/",
} as const;

export const LEGAL = {
  company: "LR Patrimoine Conseils",
  rcs: "RCS Lyon 913 427 688",
  orias: "ORIAS n°22 00 45 10",
  oriasUrl: "https://www.orias.fr/",
  acpr: "Sous le contrôle de l'ACPR (Banque de France)",
  anacofi: "Membre ANACOFI",
  siren: "913 427 688",
} as const;

export const NAV_ITEMS = [
  { href: "#approche", label: "Notre approche" },
  { href: "#services", label: "Services" },
  { href: "#simulateur", label: "Simulateur" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  FISCALITE: "Optimisation fiscale",
  IMMOBILIER: "Immobilier",
  EPARGNE: "Épargne & placements",
  RETRAITE: "Retraite",
};

export const SERVICE_CATEGORY_ICONS: Record<string, string> = {
  FISCALITE: "Receipt",
  IMMOBILIER: "Building2",
  EPARGNE: "PiggyBank",
  RETRAITE: "Palmtree",
};

export const LEAD_STATUS_LABELS: Record<string, string> = {
  NEW: "Nouveau",
  CONTACTED: "Contacté",
  QUALIFIED: "Qualifié",
  CONVERTED: "Converti",
  ARCHIVED: "Archivé",
};

export const LEAD_SOURCE_LABELS: Record<string, string> = {
  CONTACT_FORM: "Formulaire de contact",
  SIMULATEUR_RENDEMENT: "Simulateur rendement locatif",
  SIMULATEUR_DEFISCALISATION: "Simulateur défiscalisation",
  SIMULATEUR_RETRAITE: "Simulateur retraite",
  RENDEZ_VOUS: "Demande de rendez-vous",
  AUTRE: "Autre",
};

export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmé",
  CANCELLED: "Annulé",
  COMPLETED: "Terminé",
};

export const APPOINTMENT_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

/**
 * Barème progressif de l'impôt sur le revenu (par part fiscale).
 * Valeurs indicatives, à mettre à jour chaque année — servent uniquement
 * aux simulateurs (résultats non contractuels).
 */
export const TAX_BRACKETS_2026 = [
  { upTo: 11497, rate: 0 },
  { upTo: 29315, rate: 0.11 },
  { upTo: 83823, rate: 0.3 },
  { upTo: 180294, rate: 0.41 },
  { upTo: Infinity, rate: 0.45 },
] as const;

export const DEFISCALISATION_DEVICES = [
  {
    value: "DEFICIT_FONCIER",
    label: "Déficit foncier",
    description: "Travaux déductibles du revenu global, jusqu'à 10 700 € / an",
  },
  {
    value: "PER",
    label: "Plan d'Épargne Retraite (PER)",
    description: "Versements déductibles du revenu imposable",
  },
  {
    value: "MALRAUX",
    label: "Loi Malraux",
    description: "Réduction d'impôt de 22 à 30 % du montant des travaux",
  },
  {
    value: "FCPI_FIP",
    label: "FCPI / FIP",
    description: "Réduction d'impôt sur le montant investi",
  },
  {
    value: "SCPI_FISCALE",
    label: "SCPI fiscale (Pinel, Malraux…)",
    description: "Réduction d'impôt étalée sur la durée de détention",
  },
] as const;

export const RENTAL_ASSET_TYPES = [
  { value: "SCPI", label: "SCPI de rendement", defaultYield: 4.8 },
  { value: "LMNP", label: "Location meublée (LMNP)", defaultYield: 5.5 },
  { value: "NUE_PROPRIETE", label: "Nue-propriété", defaultYield: 4.2 },
  { value: "IMMOBILIER_DIRECT", label: "Immobilier locatif direct", defaultYield: 5.0 },
] as const;
