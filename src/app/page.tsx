import { Hero } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about-section";
import { ServicesSection } from "@/components/home/services-section";
import { SimulatorSection } from "@/components/home/simulator-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-muted/30">
        <AboutSection />
      </div>
      <ServicesSection />
      <div className="bg-muted/30">
        <SimulatorSection />
      </div>
      <TestimonialsSection />
      <div className="bg-muted/30">
        <FaqSection />
      </div>
      <ContactSection />
    </>
  );
}
