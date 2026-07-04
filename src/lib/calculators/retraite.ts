import type { RetraiteValues } from "@/lib/validations/simulateurs";

export type RetraiteYearPoint = {
  year: number;
  age: number;
  capital: number;
  totalVerse: number;
};

export type RetraiteResult = {
  years: RetraiteYearPoint[];
  capitalFinal: number;
  totalVerse: number;
  plusValue: number;
  renteMensuelleEstimee: number;
  dureeAnnees: number;
};

export function simulateRetraite(input: RetraiteValues): RetraiteResult {
  const { ageActuel, ageDepart, versementMensuel, capitalInitial, rendementAnnuel } = input;
  const dureeAnnees = Math.max(0, ageDepart - ageActuel);
  const monthlyRate = rendementAnnuel / 100 / 12;

  let capital = capitalInitial;
  let totalVerse = capitalInitial;
  const years: RetraiteYearPoint[] = [];

  for (let year = 1; year <= dureeAnnees; year++) {
    for (let month = 0; month < 12; month++) {
      capital = capital * (1 + monthlyRate) + versementMensuel;
      totalVerse += versementMensuel;
    }
    years.push({
      year,
      age: ageActuel + year,
      capital: Math.round(capital),
      totalVerse: Math.round(totalVerse),
    });
  }

  const capitalFinal = years.at(-1)?.capital ?? capitalInitial;
  const plusValue = capitalFinal - totalVerse;
  // Règle des 4 % : capital retirable chaque année sans épuiser le capital.
  const renteMensuelleEstimee = (capitalFinal * 0.04) / 12;

  return {
    years,
    capitalFinal,
    totalVerse: Math.round(totalVerse),
    plusValue: Math.round(plusValue),
    renteMensuelleEstimee: Math.round(renteMensuelleEstimee),
    dureeAnnees,
  };
}
