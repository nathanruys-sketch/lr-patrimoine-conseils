"use client";

import { motion, type Variants } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  context: string;
  rating: number;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophie M.",
    context: "52 ans, cadre supérieure",
    rating: 5,
    quote:
      "Après plusieurs années à reporter mes décisions d'épargne, j'ai enfin une vision claire de mon patrimoine. Ludovic a pris le temps de comprendre mes objectifs avant de proposer quoi que ce soit, ce qui change de mes précédentes expériences bancaires. Le suivi est régulier et les explications toujours accessibles.",
  },
  {
    name: "Julien D.",
    context: "dirigeant d'entreprise",
    rating: 5,
    quote:
      "Entre la gestion de mon entreprise et mes projets personnels, je n'avais jamais structuré mon patrimoine correctement. L'accompagnement proposé m'a permis de mettre en place une stratégie cohérente, sans jargon inutile. Je recommande cette approche à tout entrepreneur dans ma situation.",
  },
  {
    name: "Élodie et Marc T.",
    context: "jeunes actifs",
    rating: 4,
    quote:
      "Nous voulions commencer à investir sans nous précipiter sur des produits que nous ne comprenions pas. Les rendez-vous ont été clairs et pédagogiques, avec des réponses honnêtes à toutes nos questions, y compris les plus naïves. Seul bémol : des délais de retour un peu plus longs qu'espéré au tout démarrage.",
  },
  {
    name: "Dr Antoine B.",
    context: "47 ans, médecin libéral",
    rating: 5,
    quote:
      "En exercice libéral, ma situation fiscale et ma préparation retraite demandaient un vrai travail sur-mesure. J'ai apprécié la rigueur de l'analyse et la disponibilité pour ajuster la stratégie au fil des évolutions de mon activité. Un accompagnement sérieux, sans précipitation commerciale.",
  },
  {
    name: "Geneviève L.",
    context: "68 ans, retraitée",
    rating: 5,
    quote:
      "Je cherchais avant tout à sécuriser ce que j'avais mis des années à construire, et surtout à préparer la transmission à mes enfants dans de bonnes conditions. Les explications ont toujours été patientes, sans jamais me donner le sentiment d'être pressée. Je me sens aujourd'hui plus sereine sur l'avenir.",
  },
];

const AVERAGE_RATING = (
  TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
)
  .toFixed(1)
  .replace(".", ",");

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function StarRating({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "size-4",
            i < rating ? "fill-primary text-primary" : "text-muted-foreground/25"
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="temoignages"
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
          La confiance de nos clients
        </h2>
        <p className="mt-4 text-balance text-muted-foreground">
          Des relations construites dans la durée, autour d&apos;un accompagnement
          personnalisé et sans langue de bois.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <StarRating rating={5} label={`Note moyenne : ${AVERAGE_RATING} sur 5`} />
          <span className="text-sm text-muted-foreground">
            {AVERAGE_RATING}/5 — note moyenne communiquée par nos clients
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TESTIMONIALS.map((testimonial) => (
          <motion.div key={testimonial.name} variants={item} whileHover={{ y: -4 }}>
            <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="flex h-full flex-col gap-4">
                <Quote className="size-6 text-primary/40" aria-hidden="true" />
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {testimonial.quote}
                </p>
                <StarRating
                  rating={testimonial.rating}
                  label={`Note : ${testimonial.rating} sur 5`}
                />
                <div>
                  <p className="font-heading text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.context}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
