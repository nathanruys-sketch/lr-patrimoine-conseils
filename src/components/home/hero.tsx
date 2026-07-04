"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEGAL } from "@/lib/constants";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-14rem] -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur"
        >
          <Sparkles className="size-3.5 text-primary" />
          Conseil en gestion de patrimoine indépendant
        </motion.div>

        <motion.h1
          variants={item}
          className="text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          Votre patrimoine, <span className="text-primary">piloté avec clarté</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Optimisation fiscale, immobilier, épargne et retraite : un accompagnement
          personnalisé pour faire fructifier votre patrimoine en toute confiance.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-1.5">
            <a href="#contact">
              Prendre rendez-vous
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#services">Découvrir nos services</a>
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            {LEGAL.orias}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            {LEGAL.acpr}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            {LEGAL.anacofi}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
