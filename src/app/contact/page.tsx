import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a strategy call with Bloom Matrix, or reach us directly at bloommatrixtech@gmail.com — Coimbatore, Tamil Nadu, India.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        titleSegments={[
          { text: "Let's talk about " },
          { text: "what you're building", emphasis: true },
          { text: "." },
        ]}
        description="Tell us about your project and one of our engineering leads will follow up within 24 hours."
      />

      <section className="bg-paper py-24">
        <div className="max-w-5xl mx-auto px-container-margin grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <Reveal className="space-y-8">
            <div>
              <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-3">
                Direct Contact
              </p>
              <div className="space-y-3 font-inter text-ink-dark">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent text-[20px]">mail</span>
                  <a href="mailto:bloommatrixtech@gmail.com" className="hover:underline">
                    bloommatrixtech@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent text-[20px]">
                    location_on
                  </span>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
            <p className="font-inter text-sm text-ink-dark-muted leading-relaxed max-w-sm">
              Bloom Matrix operates as a globally-oriented AI-first technology company, working
              with startups, growing businesses, and enterprises undergoing digital
              transformation.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
