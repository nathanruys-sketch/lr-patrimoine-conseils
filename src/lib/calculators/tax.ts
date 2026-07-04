import { TAX_BRACKETS_2026 } from "@/lib/constants";

/** Impôt (par part) selon le barème progressif. */
export function computeImpotBareme(revenuParPart: number): number {
  let impot = 0;
  let previousUpTo = 0;

  for (const bracket of TAX_BRACKETS_2026) {
    if (revenuParPart <= previousUpTo) break;
    const taxableInBracket = Math.min(revenuParPart, bracket.upTo) - previousUpTo;
    impot += taxableInBracket * bracket.rate;
    previousUpTo = bracket.upTo;
  }

  return impot;
}

/** Impôt total pour un foyer, méthode du quotient familial. */
export function computeImpotQuotientFamilial(revenu: number, parts: number): number {
  const quotient = revenu / parts;
  return computeImpotBareme(quotient) * parts;
}

/** Tranche marginale d'imposition (TMI) applicable à un revenu par part. */
export function marginalRate(revenuParPart: number): number {
  for (const bracket of TAX_BRACKETS_2026) {
    if (revenuParPart <= bracket.upTo) return bracket.rate;
  }
  return TAX_BRACKETS_2026[TAX_BRACKETS_2026.length - 1].rate;
}

export const PRELEVEMENTS_SOCIAUX = 0.172;
