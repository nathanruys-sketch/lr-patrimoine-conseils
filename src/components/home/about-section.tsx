"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const complianceBadges = [
  "ORIAS n°22 00 45 10",
  "Sous le contrôle de l'ACPR",
  "Membre ANACOFI",
];

const credentials = [
  {
    icon: GraduationCap,
    title: "Diplôme JURISCAMPUS",
    description: "IOBSP, MIA, CIF et Agent Immobilier.",
  },
  {
    icon: BadgeCheck,
    title: "Agent lié du groupe Finzzle",
    description: "Un accès élargi aux solutions du marché, sans exclusivité.",
  },
  {
    icon: Award,
    title: "Certifié Prodemial Business School",
    description: "Démarche qualité certifiée Qualiopi.",
  },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Écoute & transparence",
    description: "Un dialogue sincère, sans zone d'ombre sur les frais.",
  },
  {
    icon: Lock,
    title: "Confidentialité",
    description: "La discrétion d'une relation de confiance durable.",
  },
  {
    icon: Compass,
    title: "Stratégie sur mesure",
    description: "Sans conflit d'intérêt, au service exclusif du client.",
  },
];

export function AboutSection() {
  return (
    <section
      id="approche"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Un regard indépendant sur votre patrimoine
        </h2>
        <p className="mt-4 text-balance text-muted-foreground">
          Une approche construite autour de l&apos;écoute, de la rigueur
          juridique et d&apos;une totale liberté de conseil, sans lien avec
          une banque ou un assureur.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16"
      >
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
        >
          <div className="relative w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-3xl bg-primary/10 blur-2xl"
            />
            <Card className="border-border bg-card px-8 py-10">
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar size="lg" className="size-32 sm:size-44">
                  <AvatarImage src="/ludovic-ruys.jpg" alt="Ludovic Ruys" />
                  <AvatarFallback className="text-2xl font-heading">
                    LR
                  </AvatarFallback>
                </Avatar>
                <Badge variant="secondary">Fondateur</Badge>
                <div>
                  <CardTitle className="font-heading text-xl">
                    Ludovic Ruys
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Fondateur — Conseiller en gestion de patrimoine
                    indépendant
                  </CardDescription>
                </div>
              </div>
            </Card>
          </div>

          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {complianceBadges.map((label) => (
              <li key={label} className="flex items-center gap-2">
                <ShieldCheck
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary"
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="relative h-52 w-full max-w-sm overflow-hidden rounded-2xl">
            <Image
              src="/images/client-meeting.jpg"
              alt="Rendez-vous avec un client"
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-10">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Fondateur de LR Patrimoine Conseils en 2018, Ludovic Ruys
              accompagne à Lyon particuliers, professions libérales et chefs
              d&apos;entreprise, en toute indépendance vis-à-vis des banques
              et assureurs.
            </p>
            <p>
              Sa méthode : l&apos;écoute avant la recommandation, et une
              double compétence juridique et financière pour bâtir des
              stratégies sur-mesure, sans conflit d&apos;intérêt.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Certifications &amp; accréditations
            </h3>
            <div className="mt-5 space-y-4">
              {credentials.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon
                      aria-hidden="true"
                      className="size-5 text-primary"
                    />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Nos valeurs
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {values.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="gap-3 border-border bg-card">
                  <CardHeader className="gap-2">
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary/10">
                      <Icon aria-hidden="true" className="size-4 text-primary" />
                    </span>
                    <CardTitle className="text-base">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Button asChild size="lg">
              <a href="#contact">Échanger avec Ludovic Ruys</a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
