import { computeImpotQuotientFamilial, marginalRate } from "@/lib/calculators/tax";
import type { DefiscalisationValues } from "@/lib/validations/simulateurs";

export type DefiscalisationResult = {
  impotAvant: number;
  impotApres: number;
  economieImpot: number;
  tmiAvant: number;
  tmiApres: number;
  montantRetenu: number;
  plafondApplique: number;
};

const PLAFONDS: Record<DefiscalisationValues["dispositif"], number> = {
  DEFICIT_FONCIER: 10_700,
  PER: Infinity, // plafonné dynamiquement à 10 % du revenu ci-dessous
  MALRAUX: 100_000,
  FCPI_FIP: 12_000,
  SCPI_FISCALE: 300_000,
};

export function simulateDefiscalisation(input: DefiscalisationValues): DefiscalisationResult {
  const { revenuNetImposable, parts, montantInvesti, dispositif } = input;

  const impotAvant = computeImpotQuotientFamilial(revenuNetImposable, parts);
  const tmiAvant = marginalRate(revenuNetImposable / parts) * 100;

  const plafondApplique =
    dispositif === "PER" ? revenuNetImposable * 0.1 : PLAFONDS[dispositif];
  const montantRetenu = Math.min(montantInvesti, plafondApplique);

  let baseApresDeduction = revenuNetImposable;
  let reductionDirecte = 0;

  switch (dispositif) {
    case "DEFICIT_FONCIER":
    case "PER":
      baseApresDeduction = Math.max(0, revenuNetImposable - montantRetenu);
      break;
    case "MALRAUX":
      reductionDirecte = montantRetenu * 0.22;
      break;
    case "FCPI_FIP":
      reductionDirecte = montantRetenu * 0.18;
      break;
    case "SCPI_FISCALE":
      // Réduction Pinel-like lissée sur 6 ans : ~2 %/an du montant retenu.
      reductionDirecte = montantRetenu * 0.02;
      break;
  }

  const impotApres = Math.max(
    0,
    computeImpotQuotientFamilial(baseApresDeduction, parts) - reductionDirecte
  );
  const tmiApres = marginalRate(baseApresDeduction / parts) * 100;

  return {
    impotAvant: Math.round(impotAvant),
    impotApres: Math.round(impotApres),
    economieImpot: Math.round(Math.max(0, impotAvant - impotApres)),
    tmiAvant,
    tmiApres,
    montantRetenu: Math.round(montantRetenu),
    plafondApplique: Number.isFinite(plafondApplique) ? Math.round(plafondApplique) : montantInvesti,
  };
}
