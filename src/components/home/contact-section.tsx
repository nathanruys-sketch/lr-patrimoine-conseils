"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { CONTACT } from "@/lib/constants";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      form.reset();
      toast.success("Votre message a bien été envoyé.");
    } catch {
      toast.error("Une erreur est survenue, merci de réessayer.");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Parlons de votre projet
          </h2>
          <p className="mt-4 max-w-md text-balance text-muted-foreground">
            Un premier échange gratuit et sans engagement pour faire le point sur votre
            situation patrimoniale.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 text-sm font-medium transition-colors hover:text-primary"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="size-4" />
              </span>
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-3 text-sm font-medium transition-colors hover:text-primary"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="size-4" />
              </span>
              {CONTACT.phone}
            </a>
          </div>

          <div className="relative mt-8 h-56 w-full max-w-md overflow-hidden rounded-2xl">
            <Image
              src="/images/lyon-skyline.jpg"
              alt="Vue panoramique de Lyon"
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
              <p className="text-sm font-medium text-white">Basé à Lyon, à votre écoute partout en France</p>
            </div>
          </div>
        </div>

        <Card className="p-6 sm:p-8">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <CheckCircle2 className="size-7" />
              </motion.span>
              <h3 className="font-heading text-xl font-semibold">Message envoyé</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Merci, nous revenons vers vous sous 24h ouvrées.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                Envoyer un autre message
              </Button>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jean.dupont@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="06 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Décrivez votre projet en quelques mots..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full gap-1.5" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                  Envoyer le message
                </Button>
              </form>
            </Form>
          )}
        </Card>
      </motion.div>
    </section>
  );
}
