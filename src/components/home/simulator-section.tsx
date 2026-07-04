"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { simulateRendementLocatif } from "@/lib/calculators/rendement-locatif";
import { simulateDefiscalisation } from "@/lib/calculators/defiscalisation";
import { simulateRetraite } from "@/lib/calculators/retraite";
import { DEFISCALISATION_DEVICES } from "@/lib/constants";
import { formatCurrency, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type DispositifKey = "DEFICIT_FONCIER" | "PER" | "MALRAUX" | "FCPI_FIP" | "SCPI_FISCALE";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

function StatTile({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
      <p
        className={cn(
          "font-heading text-2xl font-semibold tracking-tight sm:text-3xl",
          highlight ? "text-primary" : "text-foreground"
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function DisclaimerFooter() {
  return (
    <CardFooter className="flex flex-col items-start gap-4 border-t border-border pt-6">
      <p className="text-xs text-muted-foreground">
        Résultat indicatif et non contractuel, fourni à titre pédagogique.
      </p>
      <Button variant="outline" asChild>
        <a href="#contact">Affiner cette simulation avec un conseiller</a>
      </Button>
    </CardFooter>
  );
}

export function SimulatorSection() {
  // --- Onglet rendement locatif ---
  const [montantInvesti, setMontantInvesti] = useState<number>(50000);
  const [tauxRendement, setTauxRendement] = useState<number>(5);
  const [duree, setDuree] = useState<number>(15);
  const [reinvestirLoyers, setReinvestirLoyers] = useState<boolean>(true);
  const [tmi, setTmi] = useState<number>(30);

  const rendementResult = useMemo(
    () =>
      simulateRendementLocatif({
        montantInvesti,
        tauxRendement,
        duree,
        reinvestirLoyers,
        tmi,
      }),
    [montantInvesti, tauxRendement, duree, reinvestirLoyers, tmi]
  );

  const rendementPlusValueShare = clampPercent(
    rendementResult.patrimoineFinal > 0
      ? (rendementResult.plusValueTotale / rendementResult.patrimoineFinal) * 100
      : 0
  );

  // --- Onglet défiscalisation ---
  const [revenuNetImposable, setRevenuNetImposable] = useState<number>(60000);
  const [parts, setParts] = useState<number>(1);
  const [montantInvestiDefiscalisation, setMontantInvestiDefiscalisation] =
    useState<number>(10000);
  const [dispositif, setDispositif] = useState<DispositifKey>("PER");

  const defiscalisationResult = useMemo(
    () =>
      simulateDefiscalisation({
        revenuNetImposable,
        parts,
        montantInvesti: montantInvestiDefiscalisation,
        dispositif,
      }),
    [revenuNetImposable, parts, montantInvestiDefiscalisation, dispositif]
  );

  const selectedDevice = DEFISCALISATION_DEVICES.find(
    (device) => device.value === dispositif
  );

  const defiscalisationRetenueShare = clampPercent(
    montantInvestiDefiscalisation > 0
      ? (defiscalisationResult.montantRetenu / montantInvestiDefiscalisation) * 100
      : 0
  );

  // --- Onglet retraite ---
  const [ageActuel, setAgeActuel] = useState<number>(40);
  const [ageDepart, setAgeDepart] = useState<number>(62);
  const [versementMensuel, setVersementMensuel] = useState<number>(300);
  const [capitalInitial, setCapitalInitial] = useState<number>(10000);
  const [rendementAnnuel, setRendementAnnuel] = useState<number>(4);

  const retraiteResult = useMemo(
    () =>
      simulateRetraite({
        ageActuel,
        ageDepart,
        versementMensuel,
        capitalInitial,
        rendementAnnuel,
      }),
    [ageActuel, ageDepart, versementMensuel, capitalInitial, rendementAnnuel]
  );

  const retraiteVersementShare = clampPercent(
    retraiteResult.capitalFinal > 0
      ? (retraiteResult.totalVerse / retraiteResult.capitalFinal) * 100
      : 0
  );

  return (
    <section id="simulateur" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Simulateur patrimonial
        </h2>
        <p className="mt-4 text-balance text-muted-foreground">
          Avant même notre premier échange, visualisez l&apos;impact concret de vos décisions
          patrimoniales. Trois outils pour explorer un investissement locatif, une stratégie de
          défiscalisation ou la constitution d&apos;un capital retraite.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-14"
      >
        <Tabs defaultValue="rendement" className="w-full">
          <TabsList className="mx-auto grid h-auto w-full max-w-xl grid-cols-1 gap-1 sm:grid-cols-3">
            <TabsTrigger value="rendement">Rendement locatif</TabsTrigger>
            <TabsTrigger value="defiscalisation">Défiscalisation</TabsTrigger>
            <TabsTrigger value="retraite">Retraite</TabsTrigger>
          </TabsList>

          {/* Onglet 1 : Rendement locatif */}
          <TabsContent value="rendement" className="mt-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rendement-montant">Montant investi (€)</Label>
                  <Input
                    id="rendement-montant"
                    type="number"
                    min={0}
                    step={1000}
                    value={montantInvesti}
                    onChange={(e) => setMontantInvesti(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rendement-taux">Taux de rendement locatif brut (%)</Label>
                  <Input
                    id="rendement-taux"
                    type="number"
                    min={0}
                    max={20}
                    step={0.1}
                    value={tauxRendement}
                    onChange={(e) => setTauxRendement(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rendement-duree">Durée de détention (années)</Label>
                  <Input
                    id="rendement-duree"
                    type="number"
                    min={1}
                    max={30}
                    step={1}
                    value={duree}
                    onChange={(e) => setDuree(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rendement-tmi">Tranche marginale d&apos;imposition (%)</Label>
                  <Input
                    id="rendement-tmi"
                    type="number"
                    min={0}
                    max={45}
                    step={1}
                    value={tmi}
                    onChange={(e) => setTmi(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                  <Label htmlFor="rendement-reinvestir" className="pr-4">
                    Réinvestir les loyers perçus chaque année
                  </Label>
                  <Switch
                    id="rendement-reinvestir"
                    checked={reinvestirLoyers}
                    onCheckedChange={setReinvestirLoyers}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">
                    Résultats de la simulation
                  </CardTitle>
                  <CardDescription>
                    Projection sur {duree} ans, avec un rendement locatif brut de{" "}
                    {formatPercent(tauxRendement)}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <motion.div variants={item}>
                      <StatTile
                        label="Capital final estimé"
                        value={formatCurrency(rendementResult.capitalFinal)}
                        highlight
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="Plus-value totale"
                        value={formatCurrency(rendementResult.plusValueTotale)}
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="Revenu net annuel moyen"
                        value={formatCurrency(rendementResult.revenuNetAnnuelMoyen)}
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="Revenu net cumulé"
                        value={formatCurrency(rendementResult.revenuNetTotalCumule)}
                      />
                    </motion.div>
                  </motion.div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Part de plus-value dans le patrimoine final
                      </span>
                      <span className="font-medium">
                        {formatPercent(rendementPlusValueShare)}
                      </span>
                    </div>
                    <Progress value={rendementPlusValueShare} />
                  </div>
                </CardContent>
                <DisclaimerFooter />
              </Card>
            </div>
          </TabsContent>

          {/* Onglet 2 : Défiscalisation */}
          <TabsContent value="defiscalisation" className="mt-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defisc-revenu">Revenu net imposable du foyer (€)</Label>
                  <Input
                    id="defisc-revenu"
                    type="number"
                    min={0}
                    step={1000}
                    value={revenuNetImposable}
                    onChange={(e) => setRevenuNetImposable(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defisc-parts">Nombre de parts fiscales</Label>
                  <Input
                    id="defisc-parts"
                    type="number"
                    min={1}
                    step={0.5}
                    value={parts}
                    onChange={(e) => setParts(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defisc-montant">
                    Montant investi dans le dispositif (€)
                  </Label>
                  <Input
                    id="defisc-montant"
                    type="number"
                    min={0}
                    step={500}
                    value={montantInvestiDefiscalisation}
                    onChange={(e) =>
                      setMontantInvestiDefiscalisation(e.target.valueAsNumber || 0)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defisc-dispositif">Dispositif de défiscalisation</Label>
                  <Select
                    value={dispositif}
                    onValueChange={(value) => setDispositif(value as DispositifKey)}
                  >
                    <SelectTrigger id="defisc-dispositif">
                      <SelectValue placeholder="Choisir un dispositif" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFISCALISATION_DEVICES.map((device) => (
                        <SelectItem key={device.value} value={device.value}>
                          {device.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedDevice ? (
                    <p className="text-sm text-muted-foreground">
                      {selectedDevice.description}
                    </p>
                  ) : null}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">
                    Impact sur votre imposition
                  </CardTitle>
                  <CardDescription>
                    Estimation à partir de votre situation fiscale déclarée et du dispositif
                    sélectionné.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <motion.div variants={item}>
                      <StatTile
                        label="Économie d'impôt estimée"
                        value={formatCurrency(defiscalisationResult.economieImpot)}
                        highlight
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="Impôt avant investissement"
                        value={formatCurrency(defiscalisationResult.impotAvant)}
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="Impôt après investissement"
                        value={formatCurrency(defiscalisationResult.impotApres)}
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="TMI avant / après"
                        value={`${formatPercent(defiscalisationResult.tmiAvant)} → ${formatPercent(defiscalisationResult.tmiApres)}`}
                      />
                    </motion.div>
                  </motion.div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Part du montant investi retenue dans le calcul
                      </span>
                      <span className="font-medium">
                        {formatPercent(defiscalisationRetenueShare)}
                      </span>
                    </div>
                    <Progress value={defiscalisationRetenueShare} />
                  </div>
                </CardContent>
                <DisclaimerFooter />
              </Card>
            </div>
          </TabsContent>

          {/* Onglet 3 : Retraite */}
          <TabsContent value="retraite" className="mt-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="retraite-age-actuel">Âge actuel</Label>
                  <Input
                    id="retraite-age-actuel"
                    type="number"
                    min={18}
                    max={70}
                    step={1}
                    value={ageActuel}
                    onChange={(e) => setAgeActuel(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retraite-age-depart">
                    Âge de départ à la retraite souhaité
                  </Label>
                  <Input
                    id="retraite-age-depart"
                    type="number"
                    min={18}
                    max={75}
                    step={1}
                    value={ageDepart}
                    onChange={(e) => setAgeDepart(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retraite-versement">Versement mensuel (€)</Label>
                  <Input
                    id="retraite-versement"
                    type="number"
                    min={0}
                    step={50}
                    value={versementMensuel}
                    onChange={(e) => setVersementMensuel(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retraite-capital">
                    Capital initial déjà constitué (€)
                  </Label>
                  <Input
                    id="retraite-capital"
                    type="number"
                    min={0}
                    step={500}
                    value={capitalInitial}
                    onChange={(e) => setCapitalInitial(e.target.valueAsNumber || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retraite-rendement">
                    Rendement annuel moyen estimé (%)
                  </Label>
                  <Input
                    id="retraite-rendement"
                    type="number"
                    min={0}
                    max={15}
                    step={0.1}
                    value={rendementAnnuel}
                    onChange={(e) => setRendementAnnuel(e.target.valueAsNumber || 0)}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">
                    Projection de votre capital retraite
                  </CardTitle>
                  <CardDescription>
                    Simulation sur {retraiteResult.dureeAnnees} ans, jusqu&apos;à {ageDepart} ans.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <motion.div variants={item}>
                      <StatTile
                        label="Capital final estimé"
                        value={formatCurrency(retraiteResult.capitalFinal)}
                        highlight
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="Total versé"
                        value={formatCurrency(retraiteResult.totalVerse)}
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="Plus-value générée"
                        value={formatCurrency(retraiteResult.plusValue)}
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <StatTile
                        label="Rente mensuelle estimée"
                        value={formatCurrency(retraiteResult.renteMensuelleEstimee)}
                      />
                    </motion.div>
                  </motion.div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Part des versements dans le capital final
                      </span>
                      <span className="font-medium">
                        {formatPercent(retraiteVersementShare)}
                      </span>
                    </div>
                    <Progress value={retraiteVersementShare} />
                  </div>
                </CardContent>
                <DisclaimerFooter />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
}
