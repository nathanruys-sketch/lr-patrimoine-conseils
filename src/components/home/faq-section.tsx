"use client";

import { motion, type Variants } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const faqs = [
  {
    question: "Le premier rendez-vous est-il gratuit et sans engagement ?",
    answer:
      "Oui. Ce premier échange sert uniquement à comprendre votre situation, vos objectifs et vos priorités. Il ne donne lieu à aucune facturation ni à aucun engagement de votre part. À l'issue de ce rendez-vous, vous êtes entièrement libre de poursuivre ou non l'accompagnement.",
  },
  {
    question: "Comment le conseiller est-il rémunéré ?",
    answer:
      "La rémunération s'inscrit dans le cadre réglementé applicable aux activités de conseil en gestion de patrimoine (CIF, IOBSP, courtage en assurance), sous le contrôle de l'ACPR et de l'ANACOFI. Le mode de rémunération retenu pour chaque mission vous est présenté clairement avant toute mise en œuvre, afin que vous disposiez d'une vision complète des conditions applicables, sans frais dissimulés.",
  },
  {
    question: "Les informations que je partage restent-elles confidentielles ?",
    answer:
      "Votre situation patrimoniale, familiale et professionnelle est traitée avec la plus stricte confidentialité, dans le respect du secret professionnel attaché à l'activité de conseil et des exigences du RGPD. Vos données ne sont ni cédées ni utilisées à d'autres fins que celles de votre accompagnement.",
  },
  {
    question: "À qui s'adresse cet accompagnement ?",
    answer:
      "L'accompagnement s'adresse aux particuliers, aux dirigeants d'entreprise et aux professions libérales, quel que soit le niveau de patrimoine ou le degré d'avancement du projet. Chaque parcours est adapté à la situation réelle de la personne accompagnée, qu'il s'agisse d'un premier placement ou d'une stratégie patrimoniale plus étoffée.",
  },
  {
    question: "Les rendez-vous sont-ils uniquement possibles à Lyon ?",
    answer:
      "Le cabinet est basé à Lyon et reçoit volontiers en présentiel, mais les échanges peuvent tout aussi bien se dérouler en visioconférence. Cette souplesse permet d'accompagner des clients situés partout en France, avec la même exigence de suivi qu'un rendez-vous en personne.",
  },
  {
    question: "Quels documents prévoir avant le premier échange ?",
    answer:
      "Aucun document n'est requis pour ce premier rendez-vous : il a justement pour but de faire le point ensemble. Si vous souhaitez gagner du temps, votre dernier avis d'imposition ou quelques relevés d'épargne peuvent être utiles, mais rien n'est obligatoire pour démarrer la conversation.",
  },
  {
    question: "Le conseiller est-il indépendant des banques et compagnies d'assurance ?",
    answer:
      "Oui. LR Patrimoine Conseils n'appartient à aucun établissement bancaire ni à aucune compagnie d'assurance. Cette indépendance permet de comparer et de sélectionner les solutions les plus adaptées parmi celles disponibles sur le marché, dans le seul intérêt du client, sans conflit d'intérêt lié à la distribution d'un produit en particulier.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Questions fréquentes
        </h2>
        <p className="mt-4 text-balance text-muted-foreground">
          Tout ce qu&apos;il faut savoir avant de nous rencontrer.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mt-14 max-w-3xl"
      >
        <Accordion type="single" collapsible className="w-full divide-y divide-border">
          {faqs.map((faq, index) => (
            <motion.div key={faq.question} variants={item}>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="py-5 text-base font-heading font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
