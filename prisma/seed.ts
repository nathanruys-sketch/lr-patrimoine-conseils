import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@lr-patrimoine-conseils.fr";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMoi123!";
  const name = process.env.ADMIN_NAME ?? "Ludovic Ruys";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name, role: "ADMIN" },
  });

  console.log(`✓ Compte admin prêt : ${email}`);
}

const services = [
  {
    slug: "deficit-foncier",
    category: "FISCALITE" as const,
    title: "Déficit foncier",
    shortDescription: "Déduisez vos travaux de rénovation de votre revenu global.",
    description:
      "Le déficit foncier permet d'imputer les travaux de rénovation d'un bien locatif sur votre revenu global, dans la limite de 10 700 € par an (déficit reportable au-delà). Une stratégie particulièrement efficace pour les foyers fortement imposés qui souhaitent conjuguer rénovation d'un bien ancien et optimisation fiscale immédiate.",
    icon: "Receipt",
    highlights: [
      "Réduction d'impôt dès l'année des travaux",
      "Valorisation d'un bien ancien",
      "Report du déficit sur 10 ans",
    ],
    order: 1,
  },
  {
    slug: "loi-malraux",
    category: "FISCALITE" as const,
    title: "Loi Malraux",
    shortDescription: "Réduction d'impôt de 22 % à 30 % sur vos travaux de restauration.",
    description:
      "Dédié aux immeubles situés en secteur sauvegardé, le dispositif Malraux offre une réduction d'impôt calculée sur le montant des travaux de restauration, sans plafonnement global des niches fiscales. Un outil puissant pour les contribuables les plus imposés, alliant patrimoine de caractère et optimisation fiscale.",
    icon: "Landmark",
    highlights: [
      "Réduction d'impôt jusqu'à 30 % des travaux",
      "Hors plafond global des niches fiscales",
      "Patrimoine immobilier de caractère",
    ],
    order: 2,
  },
  {
    slug: "fcpi-fip",
    category: "FISCALITE" as const,
    title: "FCPI & FIP",
    shortDescription: "Investissez dans les PME innovantes et réduisez votre impôt.",
    description:
      "Les FCPI (Fonds Communs de Placement dans l'Innovation) et FIP (Fonds d'Investissement de Proximité) permettent d'investir dans des PME non cotées tout en bénéficiant d'une réduction d'impôt sur le revenu sur le montant versé. Une diversification patrimoniale à envisager en complément d'une stratégie globale.",
    icon: "Sprout",
    highlights: [
      "Réduction d'impôt à l'entrée",
      "Diversification vers le non coté",
      "Soutien à l'économie régionale (FIP)",
    ],
    order: 3,
  },
  {
    slug: "investissement-locatif-cle-en-main",
    category: "IMMOBILIER" as const,
    title: "Investissement locatif clé en main",
    shortDescription: "De la recherche du bien à la mise en location, sans effort de votre part.",
    description:
      "Nous prenons en charge l'intégralité du projet : recherche du bien selon vos critères, montage financier, négociation, travaux et mise en location. Vous conservez la maîtrise des décisions, nous nous occupons de l'exécution.",
    icon: "Building2",
    highlights: [
      "Recherche ciblée selon votre budget",
      "Accompagnement financement bancaire",
      "Mise en location gérée",
    ],
    order: 1,
  },
  {
    slug: "scpi-rendement",
    category: "IMMOBILIER" as const,
    title: "SCPI de rendement",
    shortDescription: "Devenez propriétaire d'un patrimoine immobilier diversifié dès 1 000 €.",
    description:
      "Les Sociétés Civiles de Placement Immobilier permettent d'investir indirectement dans l'immobilier professionnel (bureaux, commerces, santé, logistique) sans les contraintes de gestion locative. Une solution accessible pour générer des revenus complémentaires réguliers.",
    icon: "Building2",
    highlights: [
      "Ticket d'entrée accessible",
      "Mutualisation du risque locatif",
      "Gestion locative déléguée",
    ],
    order: 2,
  },
  {
    slug: "succession-transmission",
    category: "IMMOBILIER" as const,
    title: "Succession & transmission",
    shortDescription: "Anticipez la transmission de votre patrimoine immobilier.",
    description:
      "Donation, démembrement de propriété, SCI familiale : nous étudions la structure juridique la plus adaptée pour transmettre votre patrimoine dans les meilleures conditions fiscales, tout en préservant l'harmonie familiale.",
    icon: "Users",
    highlights: [
      "Réduction des droits de succession",
      "Structuration via SCI familiale",
      "Démembrement de propriété",
    ],
    order: 3,
  },
  {
    slug: "assurance-vie",
    category: "EPARGNE" as const,
    title: "Assurance-vie",
    shortDescription: "Le placement préféré des Français, sur-mesure selon votre profil.",
    description:
      "Support d'épargne privilégié pour sa fiscalité avantageuse après 8 ans et sa souplesse de gestion, l'assurance-vie s'adapte à tous les profils : fonds euros sécurisés, unités de compte dynamiques, gestion pilotée ou libre.",
    icon: "Shield",
    highlights: [
      "Fiscalité avantageuse après 8 ans",
      "Disponibilité des fonds à tout moment",
      "Transmission hors succession",
    ],
    order: 1,
  },
  {
    slug: "pea",
    category: "EPARGNE" as const,
    title: "PEA & comptes-titres",
    shortDescription: "Investissez en bourse avec une fiscalité optimisée.",
    description:
      "Le Plan d'Épargne en Actions offre une exonération d'impôt sur les plus-values après 5 ans (hors prélèvements sociaux). Couplé à un compte-titres pour les investissements hors zone euro, il constitue le socle d'une stratégie boursière long terme.",
    icon: "TrendingUp",
    highlights: [
      "Exonération d'impôt après 5 ans",
      "Accès aux marchés européens",
      "Stratégie long terme diversifiée",
    ],
    order: 2,
  },
  {
    slug: "per-individuel",
    category: "RETRAITE" as const,
    title: "Plan d'Épargne Retraite (PER)",
    shortDescription: "Préparez votre retraite tout en réduisant votre impôt aujourd'hui.",
    description:
      "Le PER individuel permet de déduire vos versements de votre revenu imposable tout en constituant un capital disponible à la retraite, sous forme de rente ou de capital. Particulièrement pertinent pour les foyers fortement imposés en phase d'activité.",
    icon: "Palmtree",
    highlights: [
      "Versements déductibles du revenu imposable",
      "Sortie en capital ou en rente",
      "Déblocage anticipé pour l'achat de la résidence principale",
    ],
    order: 1,
  },
  {
    slug: "sci-patrimoniale",
    category: "RETRAITE" as const,
    title: "SCI patrimoniale",
    shortDescription: "Structurez et transmettez votre patrimoine immobilier.",
    description:
      "La Société Civile Immobilière permet de détenir et gérer un patrimoine immobilier à plusieurs, tout en facilitant sa transmission progressive. Un outil de structuration incontournable pour préparer sereinement votre retraite et votre succession.",
    icon: "Home",
    highlights: [
      "Gestion facilitée à plusieurs associés",
      "Transmission progressive des parts",
      "Souplesse statutaire",
    ],
    order: 2,
  },
  {
    slug: "bilan-retraite",
    category: "RETRAITE" as const,
    title: "Bilan retraite personnalisé",
    shortDescription: "Faites le point sur vos droits et anticipez votre départ.",
    description:
      "Nous analysons votre relevé de carrière, estimons votre pension future et identifions les leviers pour combler l'écart entre vos revenus actuels et votre future retraite : rachat de trimestres, épargne complémentaire, immobilier.",
    icon: "FileText",
    highlights: [
      "Analyse de votre relevé de carrière",
      "Estimation de votre pension future",
      "Plan d'action personnalisé",
    ],
    order: 3,
  },
];

async function seedServices() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✓ ${services.length} services créés`);
}

const testimonials = [
  {
    authorName: "Brigitte M.",
    authorAge: 84,
    authorLocation: "Lyon",
    content:
      "C'est un excellent conseiller, très à l'écoute de nos besoins. Il a su nous accompagner avec pédagogie sur des sujets complexes.",
    rating: 5,
    source: "Google",
  },
  {
    authorName: "Philippe D.",
    authorAge: 52,
    authorLocation: "Villeurbanne",
    content:
      "Accompagnement sérieux et transparent sur mon investissement en déficit foncier. Les simulations étaient claires et les délais respectés.",
    rating: 5,
    source: "Recommandation",
  },
  {
    authorName: "Sophie L.",
    authorAge: 45,
    authorLocation: "Caluire-et-Cuire",
    content:
      "Un vrai gain de temps pour la mise en place de mon PER. Réactif, disponible, et surtout de très bons conseils fiscaux.",
    rating: 5,
    source: "Google",
  },
  {
    authorName: "Marc et Julie T.",
    authorAge: 38,
    authorLocation: "Lyon",
    content:
      "Nous cherchions à investir dans l'immobilier locatif sans savoir par où commencer. Tout a été pris en charge, du financement à la mise en location.",
    rating: 4,
    source: "Site",
  },
  {
    authorName: "Anne-Claire R.",
    authorAge: 60,
    authorLocation: "Bron",
    content:
      "Bilan retraite très complet, j'ai enfin une vision claire de mes droits et des options pour améliorer ma pension.",
    rating: 5,
    source: "Google",
  },
  {
    authorName: "Nicolas B.",
    authorAge: 41,
    authorLocation: "Oullins",
    content:
      "Approche pédagogue et sans pression commerciale. J'ai apprécié la transparence sur les frais et les rendements attendus.",
    rating: 4,
    source: "Recommandation",
  },
];

async function seedTestimonials() {
  const existing = await prisma.testimonial.count();
  if (existing > 0) {
    console.log("→ Témoignages déjà présents, seed ignoré");
    return;
  }
  await prisma.testimonial.createMany({ data: testimonials });
  console.log(`✓ ${testimonials.length} témoignages créés`);
}

const articles = [
  {
    slug: "comprendre-le-deficit-foncier-en-2026",
    title: "Comprendre le déficit foncier en 2026",
    excerpt:
      "Un dispositif méconnu mais redoutablement efficace pour réduire votre impôt tout en rénovant un bien ancien.",
    category: "Fiscalité",
    tags: ["fiscalité", "immobilier", "travaux"],
    coverImage: "/images/articles/deficit-foncier.svg",
    content: `Le déficit foncier reste l'un des dispositifs les plus efficaces pour réduire son impôt sur le revenu tout en se constituant un patrimoine immobilier de qualité.

## Le principe

Lorsque les charges liées à un bien locatif (travaux, intérêts d'emprunt, charges de copropriété) dépassent les loyers perçus, un déficit foncier est constaté. Celui-ci s'impute sur le revenu global du foyer fiscal, dans la limite de 10 700 € par an.

## Les travaux éligibles

Seuls les travaux d'entretien, de réparation et d'amélioration sont concernés — les travaux de construction ou d'agrandissement en sont exclus. Il est essentiel de bien qualifier chaque poste de dépense avant de s'engager.

## Une stratégie à anticiper

Le déficit foncier se prépare en amont de l'acquisition : choix du bien, ampleur des travaux, calendrier de réalisation. Un accompagnement personnalisé permet d'optimiser chaque paramètre selon votre situation fiscale.`,
  },
  {
    slug: "scpi-vs-immobilier-locatif-direct",
    title: "SCPI ou immobilier locatif direct : que choisir ?",
    excerpt:
      "Deux approches complémentaires pour investir dans la pierre, avec des logiques de gestion et de rendement différentes.",
    category: "Immobilier",
    tags: ["scpi", "immobilier", "rendement"],
    coverImage: "/images/articles/scpi.svg",
    content: `Investir dans l'immobilier ne se résume plus à l'achat d'un bien en direct. Les SCPI offrent une alternative accessible et mutualisée.

## La SCPI : simplicité et mutualisation

Avec un ticket d'entrée souvent inférieur à 5 000 €, la SCPI permet d'accéder à un parc immobilier diversifié (bureaux, commerces, santé) sans les contraintes de gestion locative.

## L'immobilier direct : contrôle et effet de levier

L'achat en direct permet de bénéficier pleinement de l'effet de levier du crédit et de garder la main sur chaque décision : choix du bien, du locataire, des travaux.

## Notre recommandation

Le choix dépend de votre appétence pour la gestion, votre horizon de placement et votre capacité d'emprunt. Une combinaison des deux approches est souvent la solution la plus équilibrée.`,
  },
  {
    slug: "per-le-bon-moment-pour-ouvrir-un-plan",
    title: "PER : quel est le bon moment pour ouvrir un plan ?",
    excerpt:
      "Plus votre tranche marginale d'imposition est élevée, plus l'intérêt fiscal du PER est important. Explications.",
    category: "Retraite",
    tags: ["per", "retraite", "fiscalité"],
    coverImage: "/images/articles/per.svg",
    content: `Le Plan d'Épargne Retraite s'est imposé comme un outil incontournable de préparation de la retraite depuis la loi PACTE.

## L'avantage fiscal à l'entrée

Les versements volontaires sont déductibles du revenu imposable, dans la limite de plafonds annuels. Plus votre tranche marginale d'imposition (TMI) est élevée, plus l'économie d'impôt immédiate est significative.

## Anticiper la fiscalité à la sortie

À la retraite, les sommes versées sont réintégrées au revenu imposable (en cas de sortie en capital) ou soumises au régime des pensions (en cas de sortie en rente). Un arbitrage à anticiper selon votre situation future.

## Notre conseil

Un PER se pense sur le long terme et s'articule avec les autres enveloppes d'épargne (assurance-vie, immobilier). Notre simulateur retraite vous donne une première estimation du capital constitué.`,
  },
  {
    slug: "loi-malraux-secteurs-eligibles",
    title: "Loi Malraux : quels secteurs sont éligibles ?",
    excerpt:
      "Zoom sur les zones ouvrant droit à la réduction d'impôt Malraux et les conditions à respecter.",
    category: "Fiscalité",
    tags: ["malraux", "fiscalité", "immobilier ancien"],
    coverImage: "/images/articles/malraux.svg",
    content: `Le dispositif Malraux cible les immeubles situés dans des secteurs à forte valeur patrimoniale et architecturale.

## Les zones concernées

Sites Patrimoniaux Remarquables (SPR), quartiers anciens dégradés (QAD) et quartiers conventionnés NPNRU sont les principales zones éligibles, avec des taux de réduction d'impôt variables (22 % ou 30 %).

## Les conditions à respecter

Les travaux doivent être suivis par un Architecte des Bâtiments de France et le bien doit être loué nu à usage d'habitation principale pendant au moins 9 ans.

## Pourquoi passer par un conseiller

Le montage d'une opération Malraux nécessite une expertise pointue sur la sélection du bien, le calendrier des travaux et le respect des conditions de location.`,
  },
  {
    slug: "5-erreurs-a-eviter-en-gestion-de-patrimoine",
    title: "5 erreurs à éviter en gestion de patrimoine",
    excerpt:
      "Diversification, fiscalité, horizon de placement : les pièges les plus courants et comment les éviter.",
    category: "Conseils",
    tags: ["patrimoine", "conseils", "stratégie"],
    coverImage: "/images/articles/erreurs.svg",
    content: `Une stratégie patrimoniale efficace repose sur quelques principes simples, trop souvent négligés.

## 1. Négliger la diversification

Concentrer son épargne sur un seul support expose à des risques inutiles. Immobilier, assurance-vie, PEA : chaque enveloppe a un rôle à jouer.

## 2. Ignorer son horizon de placement

Un placement bloqué sur 8 ans n'a pas vocation à recevoir une épargne de précaution. Adapter la liquidité de chaque support à son horizon est essentiel.

## 3. Sous-estimer la fiscalité

La fiscalité peut représenter plusieurs points de rendement par an. Elle doit être intégrée dès la construction de la stratégie, pas après coup.

## 4. Reporter la préparation de la retraite

Plus l'horizon est long, plus l'effet des intérêts composés joue en votre faveur. Chaque année de retard se paie cher.

## 5. Ne pas se faire accompagner

Un regard extérieur et expert permet d'objectiver ses choix et d'éviter les décisions impulsives.`,
  },
  {
    slug: "investir-en-lmnp-ce-qu-il-faut-savoir",
    title: "Investir en LMNP : ce qu'il faut savoir",
    excerpt:
      "Le statut de Loueur Meublé Non Professionnel offre un cadre fiscal attractif pour l'investissement locatif meublé.",
    category: "Immobilier",
    tags: ["lmnp", "immobilier", "fiscalité"],
    coverImage: "/images/articles/lmnp.svg",
    content: `Le statut LMNP séduit de plus en plus d'investisseurs grâce à sa fiscalité avantageuse et sa souplesse.

## Le régime réel : l'amortissement comme levier

En optant pour le régime réel, l'investisseur peut amortir le bien et le mobilier, réduisant fortement voire annulant l'imposition des loyers perçus pendant de nombreuses années.

## Résidences gérées ou location classique

Résidences étudiantes, séniors ou EHPAD offrent une gestion déléguée via un bail commercial, tandis que la location meublée classique laisse plus de flexibilité mais demande plus d'implication.

## Un statut à intégrer dans une stratégie globale

Le LMNP se combine efficacement avec d'autres enveloppes pour construire des revenus complémentaires diversifiés et fiscalement optimisés.`,
  },
];

async function seedArticles() {
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }
  console.log(`✓ ${articles.length} articles créés`);
}

async function seedLeads() {
  const existing = await prisma.lead.count();
  if (existing > 0) {
    console.log("→ Leads déjà présents, seed ignoré");
    return;
  }

  const allServices = await prisma.service.findMany({ select: { id: true } });
  const pick = (i: number) => allServices[i % allServices.length]?.id;

  const leads = [
    {
      name: "Julien Farge",
      email: "julien.farge@example.com",
      phone: "06 12 34 56 78",
      message: "Bonjour, je souhaiterais des informations sur le déficit foncier pour un bien que je vais acquérir prochainement.",
      status: "NEW" as const,
      source: "CONTACT_FORM" as const,
      serviceId: pick(0),
    },
    {
      name: "Claire Dubosc",
      email: "claire.dubosc@example.com",
      phone: "06 98 76 54 32",
      message: "Je voudrais faire le point sur mes droits à la retraite et savoir comment un PER pourrait m'aider.",
      status: "CONTACTED" as const,
      source: "SIMULATEUR_RETRAITE" as const,
      serviceId: pick(8),
    },
    {
      name: "Thomas Nguyen",
      email: "thomas.nguyen@example.com",
      phone: "07 11 22 33 44",
      message: "Intéressé par un investissement en SCPI, pouvez-vous me recontacter pour en discuter ?",
      status: "QUALIFIED" as const,
      source: "SIMULATEUR_RENDEMENT" as const,
      serviceId: pick(4),
    },
    {
      name: "Isabelle Perret",
      email: "isabelle.perret@example.com",
      phone: "06 55 44 33 22",
      message: "Nous souhaitons structurer notre patrimoine immobilier via une SCI familiale avant de le transmettre.",
      status: "CONVERTED" as const,
      source: "CONTACT_FORM" as const,
      serviceId: pick(9),
    },
    {
      name: "Marc Vasseur",
      email: "marc.vasseur@example.com",
      phone: "06 22 11 00 99",
      message: "Simple demande d'information sur les FCPI, merci de me rappeler.",
      status: "NEW" as const,
      source: "CONTACT_FORM" as const,
      serviceId: pick(2),
    },
    {
      name: "Nathalie Coste",
      email: "nathalie.coste@example.com",
      phone: "07 33 22 11 00",
      message: "J'ai testé le simulateur de défiscalisation, le résultat m'intéresse, pouvons-nous en discuter ?",
      status: "CONTACTED" as const,
      source: "SIMULATEUR_DEFISCALISATION" as const,
      serviceId: pick(1),
    },
    {
      name: "David Roche",
      email: "david.roche@example.com",
      phone: "06 44 55 66 77",
      message: "Bonjour, je cherche un accompagnement pour un premier investissement locatif clé en main.",
      status: "ARCHIVED" as const,
      source: "CONTACT_FORM" as const,
      serviceId: pick(3),
    },
    {
      name: "Sarah Meunier",
      email: "sarah.meunier@example.com",
      phone: "06 66 77 88 99",
      message: "Je souhaite prendre rendez-vous pour un bilan patrimonial complet.",
      status: "NEW" as const,
      source: "RENDEZ_VOUS" as const,
      serviceId: null,
    },
  ];

  await prisma.lead.createMany({ data: leads });
  console.log(`✓ ${leads.length} leads créés`);
}

async function seedAppointments() {
  const existing = await prisma.appointment.count();
  if (existing > 0) {
    console.log("→ Rendez-vous déjà présents, seed ignoré");
    return;
  }

  const inDays = (days: number, hour: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hour, 0, 0, 0);
    return date;
  };

  const appointments = [
    {
      name: "Sarah Meunier",
      email: "sarah.meunier@example.com",
      phone: "06 66 77 88 99",
      date: inDays(3, 10),
      slot: "10:00",
      topic: "Bilan patrimonial complet",
      status: "CONFIRMED" as const,
    },
    {
      name: "Karim Benali",
      email: "karim.benali@example.com",
      phone: "06 12 98 76 54",
      date: inDays(5, 14),
      slot: "14:00",
      topic: "Investissement locatif",
      status: "PENDING" as const,
    },
    {
      name: "Émilie Roussel",
      email: "emilie.roussel@example.com",
      phone: "07 45 12 36 89",
      date: inDays(7, 9),
      slot: "09:00",
      topic: "Préparation retraite",
      status: "PENDING" as const,
    },
    {
      name: "Laurent Fabre",
      email: "laurent.fabre@example.com",
      phone: "06 87 65 43 21",
      date: inDays(-4, 11),
      slot: "11:00",
      topic: "Optimisation fiscale",
      status: "COMPLETED" as const,
    },
    {
      name: "Céline Girard",
      email: "celine.girard@example.com",
      phone: "06 33 44 55 66",
      date: inDays(-2, 15),
      slot: "15:00",
      topic: "Assurance-vie",
      status: "CANCELLED" as const,
    },
  ];

  await prisma.appointment.createMany({ data: appointments });
  console.log(`✓ ${appointments.length} rendez-vous créés`);
}

async function seedSimulations() {
  const existing = await prisma.simulation.count();
  if (existing > 0) {
    console.log("→ Simulations déjà présentes, seed ignoré");
    return;
  }

  await prisma.simulation.createMany({
    data: [
      {
        type: "RENDEMENT_LOCATIF",
        inputs: { montantInvesti: 50000, tauxRendement: 5, duree: 15, reinvestirLoyers: true, tmi: 30 },
        results: { capitalFinal: 87500, revenuNetAnnuelMoyen: 1800 },
        leadEmail: "thomas.nguyen@example.com",
      },
      {
        type: "DEFISCALISATION",
        inputs: { revenuNetImposable: 75000, parts: 2, montantInvesti: 8000, dispositif: "PER" },
        results: { economieImpot: 2400, tmiAvant: 30, tmiApres: 30 },
        leadEmail: "nathalie.coste@example.com",
      },
      {
        type: "RETRAITE",
        inputs: { ageActuel: 45, ageDepart: 64, versementMensuel: 300, capitalInitial: 15000, rendementAnnuel: 4 },
        results: { capitalFinal: 112000, renteMensuelleEstimee: 373 },
        leadEmail: "claire.dubosc@example.com",
      },
    ],
  });
  console.log("✓ 3 simulations créées");
}

async function main() {
  await seedAdmin();
  await seedServices();
  await seedTestimonials();
  await seedArticles();
  await seedLeads();
  await seedAppointments();
  await seedSimulations();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
