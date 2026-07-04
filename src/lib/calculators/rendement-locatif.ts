import { PRELEVEMENTS_SOCIAUX } from "@/lib/calculators/tax";
import type { RendementLocatifValues } from "@/lib/validations/simulateurs";

export type RendementLocatifYearPoint = {
  year: number;
  capital: number;
  revenuBrutAnnuel: number;
  revenuNetAnnuel: number;
  patrimoineTotal: number;
};

export type RendementLocatifResult = {
  years: RendementLocatifYearPoint[];
  montantInvesti: number;
  capitalFinal: number;
  patrimoineFinal: number;
  revenuNetAnnuelMoyen: number;
  revenuNetTotalCumule: number;
  plusValueTotale: number;
};

export function simulateRendementLocatif(
  input: RendementLocatifValues
): RendementLocatifResult {
  const { montantInvesti, tauxRendement, duree, reinvestirLoyers, tmi } = input;
  const chargesRate = tmi / 100 + PRELEVEMENTS_SOCIAUX;

  let capital = montantInvesti;
  let cumulNet = 0;
  const years: RendementLocatifYearPoint[] = [];

  for (let year = 1; year <= duree; year++) {
    const revenuBrutAnnuel = capital * (tauxRendement / 100);
    const revenuNetAnnuel = revenuBrutAnnuel * (1 - chargesRate);
    cumulNet += revenuNetAnnuel;

    if (reinvestirLoyers) {
      capital += revenuNetAnnuel;
    }

    years.push({
      year,
      capital: Math.round(capital),
      revenuBrutAnnuel: Math.round(revenuBrutAnnuel),
      revenuNetAnnuel: Math.round(revenuNetAnnuel),
      patrimoineTotal: Math.round(reinvestirLoyers ? capital : montantInvesti + cumulNet),
    });
  }

  const last = years.at(-1);

  return {
    years,
    montantInvesti,
    capitalFinal: last?.capital ?? montantInvesti,
    patrimoineFinal: last?.patrimoineTotal ?? montantInvesti,
    revenuNetAnnuelMoyen: Math.round(cumulNet / duree),
    revenuNetTotalCumule: Math.round(cumulNet),
    plusValueTotale: Math.round((last?.patrimoineTotal ?? montantInvesti) - montantInvesti),
  };
}
