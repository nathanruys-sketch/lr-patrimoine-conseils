"use client";

import { motion, type Variants } from "framer-motion";
import { Building2, PiggyBank, Palmtree, Receipt, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SERVICES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Receipt,
    title: "Optimisation fiscale",
    description:
      "Déficit foncier, Malraux, FCPI/FIP : réduisez votre impôt grâce à des dispositifs adaptés à votre situation.",
  },
  {
    icon: Building2,
    title: "Immobilier",
    description:
      "Investissement locatif clé en main, SCPI, succession : construisez un patrimoine immobilier solide.",
  },
  {
    icon: PiggyBank,
    title: "Épargne & placements",
    description:
      "Assurance-vie, PEA : une stratégie d'épargne sur-mesure pour faire fructifier votre capital.",
  },
  {
    icon: Palmtree,
    title: "Retraite",
    description:
      "PER, SCI, bilan retraite : anticipez et préparez sereinement votre passage à la retraite.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Nos domaines d&apos;expertise
        </h2>
        <p className="mt-4 text-balance text-muted-foreground">
          Un accompagnement complet, quel que soit votre projet patrimonial.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {SERVICES.map((service) => (
          <motion.div key={service.title} variants={item} whileHover={{ y: -4 }}>
            <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="size-5" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
